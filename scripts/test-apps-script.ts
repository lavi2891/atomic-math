import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

type Core = {
  amValidateRequest_: (value: unknown) => unknown;
  amValidateAttemptBatch_: (value: unknown) => unknown;
  amValidateRiddleSubmissionBatch_: (value: unknown) => unknown;
  amPartitionAttempts_: (attempts: Array<Record<string, unknown>>, ids: string[]) => { accepted: Array<Record<string, unknown>>; duplicateAttemptIds: string[] };
  amAffectedSkillKeys_: (attempts: Array<Record<string, unknown>>) => string[];
  amUpsertById_: (rows: Array<Record<string, unknown>>, field: string, incoming: Array<Record<string, unknown>>) => Array<Record<string, unknown>>;
  amProjectMastery_: (studentId: string, skillId: string, attempts: Array<Record<string, unknown>>, at: string) => { mastery: number; attemptCount: number };
};
const context = vm.createContext({ Error, JSON, Object, Array, String, Number, Math });
vm.runInContext(readFileSync(new URL("../apps-script/Core.gs", import.meta.url), "utf8"), context);
const core = context as unknown as Core;
function run(name:string,fn:()=>void){fn();process.stdout.write(`PASS ${name}\n`);}
const sample=(id:string,skillId="A")=>({attemptId:id,sessionId:"S",studentId:"U",skillId,correct:true,scoreValue:1,submittedAt:"2026-01-01",sequenceNumber:1,literacyDemand:"light"});

run("all Apps Script files are valid JavaScript syntax",()=>{
  for (const file of ["Core.gs","Setup.gs","Code.gs"]) {
    assert.doesNotThrow(() => new Function(readFileSync(new URL(`../apps-script/${file}`, import.meta.url), "utf8")));
  }
});

run("request validation accepts v1 and rejects malformed input",()=>{assert.ok(core.amValidateRequest_({action:"health",requestId:"R",clientVersion:"1",payload:{}}));assert.throws(()=>core.amValidateRequest_({action:"health"}));});
run("attempt validation rejects malformed and duplicate-in-batch payloads",()=>{assert.throws(()=>core.amValidateAttemptBatch_({sessionId:"S",studentId:"U",attempts:[{}]}));assert.throws(()=>core.amValidateAttemptBatch_({sessionId:"S",studentId:"U",attempts:[sample("A"),sample("A")]}));});
run("attempt validation accepts typed supporting Skills and rejects malformed metadata",()=>{assert.ok(core.amValidateAttemptBatch_({sessionId:"S",studentId:"U",attempts:[{...sample("A"),supportingSkills:["ALG_VARIABLE"]}]}));assert.throws(()=>core.amValidateAttemptBatch_({sessionId:"S",studentId:"U",attempts:[{...sample("A"),supportingSkills:[1]}]}));});
run("attempt validation accepts literacy demand and rejects invalid values",()=>{assert.ok(core.amValidateAttemptBatch_({sessionId:"S",studentId:"U",attempts:[sample("A")]}));assert.throws(()=>core.amValidateAttemptBatch_({sessionId:"S",studentId:"U",attempts:[{...sample("A"),literacyDemand:"extreme"}]}));});
run("Google Sheets schema and row mapping preserve literacy demand",()=>{assert.match(readFileSync(new URL("../apps-script/Setup.gs",import.meta.url),"utf8"),/supportingSkillsJson","literacyDemand"/);assert.match(readFileSync(new URL("../apps-script/Code.gs",import.meta.url),"utf8"),/literacyDemand:a\.literacyDemand/);});
run("riddle submissions validate separately and have an append-only Sheet",()=>{const submission={submissionId:"R1",studentId:"U",riddleId:"RIDDLE",responseText:"פתרון",submittedAt:"2026-01-01",updatedAt:"2026-01-01",difficulty:"medium",status:"submitted"};assert.ok(core.amValidateRiddleSubmissionBatch_({studentId:"U",submissions:[submission]}));assert.throws(()=>core.amValidateRiddleSubmissionBatch_({studentId:"U",submissions:[{...submission,difficulty:"expert"}]}));assert.match(readFileSync(new URL("../apps-script/Setup.gs",import.meta.url),"utf8"),/RiddleSubmissions/);});
run("duplicate submission and idempotent retry partition correctly",()=>{const first=core.amPartitionAttempts_([sample("A"),sample("B")],[]);assert.equal(first.accepted.length,2);const retry=core.amPartitionAttempts_([sample("A"),sample("B")],["A","B"]);assert.equal(JSON.stringify(retry.duplicateAttemptIds),JSON.stringify(["A","B"]));assert.equal(retry.accepted.length,0);});
run("affected skills are grouped once",()=>{assert.equal(JSON.stringify(core.amAffectedSkillKeys_([sample("A","X"),sample("B","X"),sample("C","Y")])),JSON.stringify(["U||X","U||Y"]));});
run("mastery recalculation receives grouped history",()=>{const snapshot=core.amProjectMastery_("U","A",[sample("A"),{...sample("B"),scoreValue:0,correct:false}],"now");assert.equal(snapshot.mastery,50);assert.equal(snapshot.attemptCount,2);});
run("session upsert is idempotent by sessionId",()=>{const rows=core.amUpsertById_([{sessionId:"S",status:"active"}],"sessionId",[{sessionId:"S",status:"completed"}]);assert.equal(rows.length,1);assert.equal(rows[0]?.status,"completed");});
