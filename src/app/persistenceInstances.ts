import { IndexedDbPersistenceDriver } from "../infrastructure/persistence/IndexedDbPersistenceDriver.ts";
import { MemoryPersistenceDriver } from "../infrastructure/persistence/MemoryPersistenceDriver.ts";
import {
  DurableAttemptRepository,
  DurableSessionRepository,
  DurableSyncMetadataRepository,
} from "../infrastructure/persistence/DurableRepositories.ts";

export const persistenceDriver = typeof indexedDB === "undefined"
  ? new MemoryPersistenceDriver()
  : new IndexedDbPersistenceDriver();

export const attemptRepository = new DurableAttemptRepository(persistenceDriver);
export const sessionRepository = new DurableSessionRepository(persistenceDriver);
export const syncMetadataRepository = new DurableSyncMetadataRepository(persistenceDriver);
