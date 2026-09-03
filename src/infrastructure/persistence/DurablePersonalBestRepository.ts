import { challengeSignatureKey } from "../../domain/personalBests/challengeSignature.ts";
import type { PersonalBest, PersonalBestRepository } from "../../domain/personalBests/types.ts";
import type { PersistenceDriver } from "./driver.ts";

export class DurablePersonalBestRepository implements PersonalBestRepository {
  private readonly driver: PersistenceDriver;
  constructor(driver: PersistenceDriver) { this.driver = driver; }
  async get(studentId: string, signature: PersonalBest["signature"]): Promise<PersonalBest | null> { return this.driver.getPersonalBest(challengeSignatureKey(studentId, signature)); }
  async record(candidate: Omit<PersonalBest, "key">) {
    const best = { ...candidate, key: challengeSignatureKey(candidate.studentId, candidate.signature) };
    const update = await this.driver.putPersonalBestIfHigher(best);
    return { best: update.best, previousBest: update.previousBest, isNewRecord: update.updated };
  }
}
