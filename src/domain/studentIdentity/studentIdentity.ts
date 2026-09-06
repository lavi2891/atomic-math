export const STUDENT_IDENTITY_STORAGE_KEY = "atomic-math.active-student.v1";

export interface StudentIdentityStorage {
  read(): string | null;
  remember(studentId: string): void;
  clear(): void;
}

export type ResolvedStudentIdentity = {
  studentId: string;
  source: "remembered" | "fallback";
};

export function normalizeStudentCode(value: string): string {
  return value.trim().toUpperCase();
}

export function isPlausibleStudentCode(value: string): boolean {
  return /^[A-Z0-9][A-Z0-9-]{1,31}$/.test(normalizeStudentCode(value));
}

export class LocalStudentIdentityStorage implements StudentIdentityStorage {
  private readonly storage: Pick<Storage, "getItem" | "setItem" | "removeItem">;

  constructor(storage: Pick<Storage, "getItem" | "setItem" | "removeItem">) {
    this.storage = storage;
  }

  read(): string | null {
    try {
      const value = this.storage.getItem(STUDENT_IDENTITY_STORAGE_KEY);
      return value && isPlausibleStudentCode(value) ? normalizeStudentCode(value) : null;
    } catch {
      return null;
    }
  }

  remember(studentId: string): void {
    const normalized = normalizeStudentCode(studentId);
    if (!isPlausibleStudentCode(normalized)) throw new Error("Invalid student code");
    this.storage.setItem(STUDENT_IDENTITY_STORAGE_KEY, normalized);
  }

  clear(): void {
    this.storage.removeItem(STUDENT_IDENTITY_STORAGE_KEY);
  }
}

export function resolveStudentIdentity(storage: StudentIdentityStorage, fallbackStudentId: string | null): ResolvedStudentIdentity | null {
  const remembered = storage.read();
  if (remembered) return { studentId: remembered, source: "remembered" };
  if (fallbackStudentId && isPlausibleStudentCode(fallbackStudentId)) {
    return { studentId: normalizeStudentCode(fallbackStudentId), source: "fallback" };
  }
  return null;
}
