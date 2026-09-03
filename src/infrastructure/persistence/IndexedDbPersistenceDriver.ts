import type { PersistenceDriver, StoredAttempt, StoredSession, SyncState } from "./driver.ts";
import type { SyncMetadata } from "../../domain/sync/types.ts";
import type { Attempt } from "../../domain/attempts/types.ts";
import type { CachedStudentHome } from "../../domain/studentHome/types.ts";
import type { PersonalBest } from "../../domain/personalBests/types.ts";
import { isBetterPersonalBest } from "../../domain/personalBests/compare.ts";

const DB_NAME = "atomic-math";
const DB_VERSION = 2;
const LEGACY_ATTEMPTS_KEY = "atomicMath.attempts.v1";

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"));
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("IndexedDB transaction failed"));
    transaction.onabort = () => reject(transaction.error ?? new Error("IndexedDB transaction aborted"));
  });
}

export class IndexedDbPersistenceDriver implements PersistenceDriver {
  private readonly databasePromise: Promise<IDBDatabase>;

  constructor(databaseName = DB_NAME) {
    if (typeof indexedDB === "undefined") throw new Error("IndexedDB is not available");
    this.databasePromise = this.open(databaseName);
  }

  private async open(databaseName: string): Promise<IDBDatabase> {
    const request = indexedDB.open(databaseName, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("attempts")) db.createObjectStore("attempts", { keyPath: "value.attemptId" });
      if (!db.objectStoreNames.contains("sessions")) db.createObjectStore("sessions", { keyPath: "value.id" });
      if (!db.objectStoreNames.contains("metadata")) db.createObjectStore("metadata", { keyPath: "id" });
      if (!db.objectStoreNames.contains("personalBests")) db.createObjectStore("personalBests", { keyPath: "key" });
    };
    const database = await requestResult(request);
    await this.migrateLegacyAttempts(database);
    return database;
  }

  private async migrateLegacyAttempts(database: IDBDatabase): Promise<void> {
    if (typeof localStorage === "undefined") return;
    const transaction = database.transaction(["attempts", "metadata"], "readwrite");
    const metadataStore = transaction.objectStore("metadata");
    const migrated = await requestResult(metadataStore.get("legacy-attempts-migrated"));
    if (migrated) { await transactionDone(transaction); return; }
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(LEGACY_ATTEMPTS_KEY) ?? "null");
      if (parsed && typeof parsed === "object" && "attempts" in parsed && Array.isArray(parsed.attempts)) {
        const attemptStore = transaction.objectStore("attempts");
        for (const attempt of parsed.attempts as Attempt[]) {
          if (typeof attempt?.attemptId === "string") attemptStore.put({ value: attempt, syncState: "pending" });
        }
      }
    } catch {
      // A malformed legacy payload is left untouched and does not block startup.
    }
    metadataStore.put({ id: "legacy-attempts-migrated", value: true });
    await transactionDone(transaction);
  }

  private async put(storeName: "attempts" | "sessions", value: StoredAttempt | StoredSession): Promise<void> {
    const database = await this.databasePromise;
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(value);
    await transactionDone(transaction);
  }

  private async list<T>(storeName: "attempts" | "sessions"): Promise<T[]> {
    const database = await this.databasePromise;
    const transaction = database.transaction(storeName, "readonly");
    return requestResult(transaction.objectStore(storeName).getAll()) as Promise<T[]>;
  }

  async putAttempt(record: StoredAttempt) {
    const existing = (await this.list<StoredAttempt>("attempts")).some((item) => item.value.attemptId === record.value.attemptId);
    if (!existing) await this.put("attempts", record);
  }
  async listAttempts() { return this.list<StoredAttempt>("attempts"); }
  async updateAttemptSyncState(ids: readonly string[], state: SyncState) { await this.updateStates("attempts", ids, state); }
  async putSession(record: StoredSession) { await this.put("sessions", record); }
  async getSession(id: string) {
    const database = await this.databasePromise;
    const transaction = database.transaction("sessions", "readonly");
    return (await requestResult(transaction.objectStore("sessions").get(id)) as StoredSession | undefined) ?? null;
  }
  async listSessions() { return this.list<StoredSession>("sessions"); }
  async updateSessionSyncState(ids: readonly string[], state: SyncState) { await this.updateStates("sessions", ids, state); }

  private async updateStates(storeName: "attempts" | "sessions", ids: readonly string[], state: SyncState) {
    const database = await this.databasePromise;
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const records = await requestResult(store.getAll()) as Array<StoredAttempt | StoredSession>;
    const wanted = new Set(ids);
    for (const record of records) {
      const id = "attemptId" in record.value ? record.value.attemptId : record.value.id;
      if (wanted.has(id)) { record.syncState = state; store.put(record); }
    }
    await transactionDone(transaction);
  }

  async getMetadata(): Promise<SyncMetadata> {
    const database = await this.databasePromise;
    const transaction = database.transaction("metadata", "readonly");
    const record = await requestResult(transaction.objectStore("metadata").get("sync")) as { value: SyncMetadata } | undefined;
    return record?.value ?? { retryCount: 0 };
  }
  async putMetadata(metadata: SyncMetadata) {
    const database = await this.databasePromise;
    const transaction = database.transaction("metadata", "readwrite");
    transaction.objectStore("metadata").put({ id: "sync", value: metadata });
    await transactionDone(transaction);
  }

  async getStudentHome(studentId: string): Promise<CachedStudentHome | null> {
    const database = await this.databasePromise;
    const transaction = database.transaction("metadata", "readonly");
    const record = await requestResult(transaction.objectStore("metadata").get(`student-home:${studentId}`)) as { value: CachedStudentHome } | undefined;
    return record?.value ?? null;
  }

  async putStudentHome(home: CachedStudentHome): Promise<void> {
    const database = await this.databasePromise;
    const transaction = database.transaction("metadata", "readwrite");
    transaction.objectStore("metadata").put({ id: `student-home:${home.studentId}`, value: home });
    await transactionDone(transaction);
  }

  async getPersonalBest(key: string): Promise<PersonalBest | null> {
    const database = await this.databasePromise;
    const transaction = database.transaction("personalBests", "readonly");
    return (await requestResult(transaction.objectStore("personalBests").get(key)) as PersonalBest | undefined) ?? null;
  }

  async putPersonalBestIfHigher(best: PersonalBest) {
    const database = await this.databasePromise;
    const transaction = database.transaction("personalBests", "readwrite");
    const store = transaction.objectStore("personalBests");
    const previousBest = (await requestResult(store.get(best.key)) as PersonalBest | undefined) ?? null;
    const updated = isBetterPersonalBest(best, previousBest);
    if (updated) store.put(best);
    await transactionDone(transaction);
    return { best: updated ? best : previousBest!, previousBest, updated };
  }
}
