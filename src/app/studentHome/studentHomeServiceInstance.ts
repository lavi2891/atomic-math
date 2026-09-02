import { attemptRepository, persistenceDriver } from "../persistenceInstances.ts";
import { appsScriptClient } from "../syncInstance.ts";
import { StudentHomeService } from "./StudentHomeService.ts";

export const studentHomeService = new StudentHomeService(attemptRepository, persistenceDriver, appsScriptClient);
