import { IndexedDbPersistenceDriver } from "../infrastructure/persistence/IndexedDbPersistenceDriver.ts";
import { MemoryPersistenceDriver } from "../infrastructure/persistence/MemoryPersistenceDriver.ts";
import {
  DurableAttemptRepository,
  DurableRiddleSubmissionRepository,
  DurableSessionRepository,
  DurableSyncMetadataRepository,
} from "../infrastructure/persistence/DurableRepositories.ts";
import { DurablePersonalBestRepository } from "../infrastructure/persistence/DurablePersonalBestRepository.ts";

export const persistenceDriver = typeof indexedDB === "undefined"
  ? new MemoryPersistenceDriver()
  : new IndexedDbPersistenceDriver();

export const attemptRepository = new DurableAttemptRepository(persistenceDriver);
export const sessionRepository = new DurableSessionRepository(persistenceDriver);
export const syncMetadataRepository = new DurableSyncMetadataRepository(persistenceDriver);
export const personalBestRepository = new DurablePersonalBestRepository(persistenceDriver);
export const riddleSubmissionRepository = new DurableRiddleSubmissionRepository(persistenceDriver);
