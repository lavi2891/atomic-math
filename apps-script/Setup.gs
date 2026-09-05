var AM_SHEETS = {
  Students: ["studentId","displayName","classId","groupId","active","createdAt","updatedAt"],
  Attempts: ["submittedAt","attemptId","sessionId","studentId","questionId","questionInstanceId","generatorId","generatorSeed","skillId","difficulty","answerJson","normalizedAnswerJson","correct","supportLevel","scoreValue","responseTimeMs","sequenceNumber","tagsJson","misconceptionIdsJson","supportingSkillsJson","literacyDemand"],
  RiddleSubmissions: ["submittedAt","updatedAt","submissionId","studentId","riddleId","responseText","finalAnswerText","finalAnswerCorrect","difficulty","status"],
  Sessions: ["sessionId","studentId","source","assignmentId","mode","selectedSkillIdsJson","strategy","startedAt","endedAt","status","questionCount","correctCount","incorrectCount","accuracy","gameScore","syncedAt"],
  Mastery: ["studentId","skillId","mastery","accuracy","fluencyMedianMs","attemptCount","recentAverage","historyAverage","evidenceLevel","lastAttemptAt","calculatedAt","updatedAt"],
  Assignments: ["assignmentId","studentId","skillId","targetMastery","priority","active","createdAt","dueAt","completedAt"],
  Classes: ["classId","name","active"],
  AppConfig: ["key","valueJson","updatedAt"]
};

function initializeAtomicMathSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(AM_SHEETS).forEach(function(name) {
    var sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
    var headers = AM_SHEETS[name];
    var existing = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    var appendOnlyUpgrade = existing.length <= headers.length && existing.every(function(header, index) { return header === headers[index]; });
    if (sheet.getLastRow() > 1 && existing.join("|") !== headers.join("|") && !appendOnlyUpgrade) throw new Error(name + " has data and incompatible headers; refusing to overwrite");
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  });
  PropertiesService.getScriptProperties().setProperty("ATOMIC_MATH_SPREADSHEET_ID", spreadsheet.getId());
}

function resetAtomicMathDevelopmentSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var markerSheet = spreadsheet.getSheetByName("AppConfig");
  var marker = markerSheet ? markerSheet.getRange("A1").getNote() : "";
  if (marker !== "ATOMIC_MATH_DEVELOPMENT_SHEET") throw new Error("Safety stop: add note ATOMIC_MATH_DEVELOPMENT_SHEET to cell A1 before resetting");
  Object.keys(AM_SHEETS).forEach(function(name) {
    var sheet = spreadsheet.getSheetByName(name);
    if (sheet && sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.max(sheet.getLastColumn(), AM_SHEETS[name].length)).clearContent();
  });
  initializeAtomicMathSheets();
}

function rebuildAllMasteryCache() {
  var spreadsheet = amSpreadsheet_();
  var attempts = amReadAttempts_(spreadsheet.getSheetByName("Attempts"));
  var keys = {};
  attempts.forEach(function(attempt) { keys[attempt.studentId + "||" + attempt.skillId] = true; });
  var masterySheet = spreadsheet.getSheetByName("Mastery");
  if (masterySheet.getLastRow() > 1) {
    masterySheet.getRange(2, 1, masterySheet.getLastRow() - 1, masterySheet.getLastColumn()).clearContent();
  }
  return amRebuildAffectedMastery_(spreadsheet, Object.keys(keys));
}
