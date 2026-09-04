export type ReviewStatus = "approved" | "needs-fix" | "rejected";

export interface QuestionReviewRecord {
  definitionId: string;
  /** Definition version inspected when this status was saved. Legacy records may omit it. */
  definitionVersion?: number;
  status: ReviewStatus;
  note: string;
  reviewedAt: string;
}

export interface AuthorReviewStore {
  list(): Promise<QuestionReviewRecord[]>;
  put(record: QuestionReviewRecord): Promise<void>;
  remove(definitionId: string): Promise<void>;
}

export class MemoryAuthorReviewStore implements AuthorReviewStore {
  readonly records = new Map<string, QuestionReviewRecord>();
  async list() { return [...this.records.values()].map((record) => structuredClone(record)); }
  async put(record: QuestionReviewRecord) { this.records.set(record.definitionId, structuredClone(record)); }
  async remove(definitionId: string) { this.records.delete(definitionId); }
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Authoring IndexedDB request failed"));
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("Authoring IndexedDB transaction failed"));
    transaction.onabort = () => reject(transaction.error ?? new Error("Authoring IndexedDB transaction aborted"));
  });
}

export class IndexedDbAuthorReviewStore implements AuthorReviewStore {
  private readonly databasePromise: Promise<IDBDatabase>;

  constructor(databaseName = "atomic-math-authoring") {
    if (typeof indexedDB === "undefined") throw new Error("IndexedDB is not available");
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("questionReviews")) request.result.createObjectStore("questionReviews", { keyPath: "definitionId" });
    };
    this.databasePromise = requestResult(request);
  }

  async list(): Promise<QuestionReviewRecord[]> {
    const database = await this.databasePromise;
    return requestResult(database.transaction("questionReviews", "readonly").objectStore("questionReviews").getAll());
  }

  async put(record: QuestionReviewRecord): Promise<void> {
    const database = await this.databasePromise;
    const transaction = database.transaction("questionReviews", "readwrite");
    transaction.objectStore("questionReviews").put(record);
    await transactionDone(transaction);
  }

  async remove(definitionId: string): Promise<void> {
    const database = await this.databasePromise;
    const transaction = database.transaction("questionReviews", "readwrite");
    transaction.objectStore("questionReviews").delete(definitionId);
    await transactionDone(transaction);
  }
}

export class AuthorReviewRepository {
  private readonly store: AuthorReviewStore;
  constructor(store: AuthorReviewStore) { this.store = store; }

  async list(): Promise<QuestionReviewRecord[]> { return this.store.list(); }

  async save(definitionId: string, status: ReviewStatus, note: string, reviewedAt = new Date().toISOString(), definitionVersion?: number): Promise<QuestionReviewRecord> {
    const record = { definitionId, status, note: note.trim(), reviewedAt, definitionVersion } satisfies QuestionReviewRecord;
    await this.store.put(record);
    return record;
  }

  async clear(definitionId: string): Promise<void> { await this.store.remove(definitionId); }
}

export function createAuthorReviewRepository(): AuthorReviewRepository {
  return new AuthorReviewRepository(typeof indexedDB === "undefined" ? new MemoryAuthorReviewStore() : new IndexedDbAuthorReviewStore());
}
