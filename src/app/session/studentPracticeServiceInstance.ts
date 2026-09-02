import { attemptRepository, sessionRepository } from "../persistenceInstances.ts";
import { syncCoordinator } from "../syncInstance.ts";
import { StudentPracticeService } from "./StudentPracticeService.ts";

export const studentPracticeService = new StudentPracticeService(attemptRepository, sessionRepository, syncCoordinator);
