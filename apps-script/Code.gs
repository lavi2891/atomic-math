function doGet() { return amJson_({ ok: true, requestId: "health", serverTime: new Date().toISOString(), data: { service: "Atomic Math", version: "1" } }); }

function doPost(event) {
  var requestId = "unknown";
  try {
    var request = amValidateRequest_(JSON.parse(event.postData.contents));
    requestId = request.requestId;
    var handlers = { health: amHealth_, getStudentHome: amGetStudentHome_, startSession: amStartSession_, submitAttempts: amSubmitAttempts_, endSession: amEndSession_, getSyncState: amGetSyncState_, upsertAssignments: amUpsertAssignments_ };
    if (!handlers[request.action]) throw amError_("UNKNOWN_ACTION", "Unknown action: " + request.action, false);
    return amJson_({ ok: true, requestId: requestId, serverTime: new Date().toISOString(), data: handlers[request.action](request.payload || {}) });
  } catch (error) {
    return amJson_({ ok: false, requestId: requestId, error: { code: error.amCode || "SERVER_ERROR", message: error.message || String(error), retryable: error.amRetryable !== undefined ? error.amRetryable : true } });
  }
}

function amSpreadsheet_() { var id = PropertiesService.getScriptProperties().getProperty("ATOMIC_MATH_SPREADSHEET_ID"); if (!id) throw amError_("NOT_INITIALIZED", "Run initializeAtomicMathSheets first", false); return SpreadsheetApp.openById(id); }
function amJson_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function amHealth_() { return { service: "Atomic Math", version: "1" }; }
function amHeaders_(sheet) { var values = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; var map = {}; values.forEach(function(value, index) { map[value] = index; }); return { values: values, map: map }; }
function amObjects_(sheet) { if (sheet.getLastRow() < 2) return []; var headers = amHeaders_(sheet).values; return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues().map(function(row) { var item = {}; headers.forEach(function(h, i) { item[h] = row[i]; }); return item; }); }
function amRow_(headers, object) { return headers.map(function(header) { var value = object[header]; return value === undefined || value === null ? "" : value; }); }

function amSubmitAttempts_(payload) {
  payload = amValidateAttemptBatch_(payload);
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var spreadsheet = amSpreadsheet_(); var sheet = spreadsheet.getSheetByName("Attempts"); var headerInfo = amHeaders_(sheet);
    var existingIds = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, headerInfo.map.attemptId + 1, sheet.getLastRow() - 1, 1).getValues().map(function(row) { return row[0]; });
    var partition = amPartitionAttempts_(payload.attempts, existingIds);
    if (partition.accepted.length) {
      var rows = partition.accepted.map(function(a) { return amRow_(headerInfo.values, {
        submittedAt:a.submittedAt,attemptId:a.attemptId,sessionId:a.sessionId,studentId:a.studentId,questionId:a.questionId,questionInstanceId:a.questionInstanceId,generatorId:a.generatorId,generatorSeed:a.generatorSeed,skillId:a.skillId,difficulty:a.difficulty,answerJson:JSON.stringify(a.submittedAnswer),normalizedAnswerJson:JSON.stringify(a.normalizedAnswer),correct:a.correct,supportLevel:a.supportLevel,scoreValue:a.scoreValue,responseTimeMs:a.responseTimeMs,sequenceNumber:a.sequenceNumber,tagsJson:JSON.stringify(a.tags || []),misconceptionIdsJson:JSON.stringify(a.misconceptionIds || []),supportingSkillsJson:JSON.stringify(a.supportingSkills || [])
      }); });
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, headerInfo.values.length).setValues(rows);
    }
    var mastery = amRebuildAffectedMastery_(spreadsheet, amAffectedSkillKeys_(payload.attempts));
    return { acceptedAttemptIds: partition.accepted.map(function(a){return a.attemptId;}), duplicateAttemptIds: partition.duplicateAttemptIds, masterySnapshots: mastery };
  } finally { lock.releaseLock(); }
}

function amReadAttempts_(sheet) { return amObjects_(sheet).map(function(a) { return { submittedAt:String(a.submittedAt),studentId:String(a.studentId),skillId:String(a.skillId),scoreValue:Number(a.scoreValue),correct:a.correct === true || String(a.correct).toUpperCase() === "TRUE",sequenceNumber:Number(a.sequenceNumber),supportLevel:String(a.supportLevel),responseTimeMs:Number(a.responseTimeMs) }; }); }
function amRebuildAffectedMastery_(spreadsheet, keys) {
  var allAttempts = amReadAttempts_(spreadsheet.getSheetByName("Attempts")); var now = new Date().toISOString();
  var updated = keys.map(function(key) { var parts = key.split("||"); return amProjectMastery_(parts[0], parts[1], allAttempts, now); });
  var sheet = spreadsheet.getSheetByName("Mastery"); var headers = amHeaders_(sheet).values; var current = amObjects_(sheet); var byKey = {};
  current.forEach(function(row){byKey[row.studentId+"||"+row.skillId]=row;}); updated.forEach(function(row){byKey[row.studentId+"||"+row.skillId]=row;});
  var rows = Object.keys(byKey).sort().map(function(key){return amRow_(headers,byKey[key]);});
  if (sheet.getLastRow()>1) sheet.getRange(2,1,sheet.getLastRow()-1,headers.length).clearContent();
  if (rows.length) sheet.getRange(2,1,rows.length,headers.length).setValues(rows);
  return updated;
}

function amUpsertSession_(payload) { var session = payload.session; if (!session || !session.id) throw amError_("INVALID_SESSION","Missing session",false); var sheet=amSpreadsheet_().getSheetByName("Sessions"); var headers=amHeaders_(sheet); var ids=sheet.getLastRow()<2?[]:sheet.getRange(2,headers.map.sessionId+1,sheet.getLastRow()-1,1).getValues().map(function(r){return String(r[0]);}); var row=amRow_(headers.values,{sessionId:session.id,studentId:session.studentId,source:session.source,assignmentId:session.assignmentId,mode:session.settings.mode,selectedSkillIdsJson:JSON.stringify(session.selectedSkillIds),strategy:session.strategy,startedAt:new Date(session.startedAt).toISOString(),endedAt:session.endedAt?new Date(session.endedAt).toISOString():"",status:session.status,questionCount:session.questionCount,correctCount:session.correctCount,incorrectCount:session.incorrectCount,accuracy:session.accuracy,gameScore:session.gameScore,syncedAt:new Date().toISOString()}); var index=ids.indexOf(session.id); sheet.getRange(index<0?sheet.getLastRow()+1:index+2,1,1,row.length).setValues([row]); return {sessionId:session.id}; }
function amStartSession_(payload){return amUpsertSession_(payload);} function amEndSession_(payload){return amUpsertSession_(payload);}
function amGetStudentHome_(payload){var ss=amSpreadsheet_();var id=String(payload.studentId||"");var students=amObjects_(ss.getSheetByName("Students"));return{student:students.filter(function(s){return String(s.studentId)===id;})[0]||null,activeAssignments:amObjects_(ss.getSheetByName("Assignments")).filter(function(a){return String(a.studentId)===id&&(a.active===true||String(a.active).toUpperCase()==="TRUE");}),masterySnapshots:amObjects_(ss.getSheetByName("Mastery")).filter(function(m){return String(m.studentId)===id;})};}
function amGetSyncState_(payload){var ss=amSpreadsheet_();var id=String(payload.studentId||"");return{studentId:id,attemptCount:amObjects_(ss.getSheetByName("Attempts")).filter(function(a){return String(a.studentId)===id;}).length,serverTime:new Date().toISOString()};}
function amUpsertAssignments_(payload){var rows=payload.assignments;if(!Array.isArray(rows))throw amError_("INVALID_ASSIGNMENTS","assignments must be an array",false);var sheet=amSpreadsheet_().getSheetByName("Assignments");var headers=amHeaders_(sheet).values;var current=amObjects_(sheet);var map={};current.forEach(function(a){map[a.assignmentId]=a;});rows.forEach(function(a){if(!a.assignmentId||!a.studentId||!a.skillId)throw amError_("INVALID_ASSIGNMENT","Invalid assignment",false);map[a.assignmentId]=a;});var output=Object.keys(map).map(function(k){return amRow_(headers,map[k]);});if(sheet.getLastRow()>1)sheet.getRange(2,1,sheet.getLastRow()-1,headers.length).clearContent();if(output.length)sheet.getRange(2,1,output.length,headers.length).setValues(output);return{assignmentIds:rows.map(function(a){return a.assignmentId;})};}
