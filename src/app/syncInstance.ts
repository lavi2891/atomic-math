import { attemptRepository, sessionRepository, syncMetadataRepository } from "./persistenceInstances.ts";
import { runtimeConfig } from "../config/runtime.ts";
import { AppsScriptClient } from "../infrastructure/sync/AppsScriptClient.ts";
import { SyncCoordinator } from "../infrastructure/sync/SyncCoordinator.ts";

export const appsScriptClient = runtimeConfig.appsScriptUrl ? new AppsScriptClient(runtimeConfig.appsScriptUrl) : null;
export const syncCoordinator = new SyncCoordinator(attemptRepository, sessionRepository, syncMetadataRepository, appsScriptClient);
