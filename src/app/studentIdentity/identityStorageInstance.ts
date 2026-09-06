import { LocalStudentIdentityStorage } from "../../domain/studentIdentity/studentIdentity.ts";

const unavailableStorage: Storage = {
  length: 0,
  clear() {},
  getItem() { return null; },
  key() { return null; },
  removeItem() {},
  setItem() {},
};

export const studentIdentityStorage = new LocalStudentIdentityStorage(
  typeof localStorage === "undefined" ? unavailableStorage : localStorage,
);
