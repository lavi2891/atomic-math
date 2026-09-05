var AM_MAX_ATTEMPT_BATCH = 25;
var AM_MASTERY_CONFIG = { recentWindow: 10, historyWindow: 50, recentWeight: 0.85, historyWeight: 0.15 };

function amValidateRequest_(request) {
  if (!request || typeof request !== "object") throw amError_("INVALID_REQUEST", "Request must be an object", false);
  if (typeof request.action !== "string" || !request.action) throw amError_("INVALID_ACTION", "Missing action", false);
  if (typeof request.requestId !== "string" || !request.requestId) throw amError_("INVALID_REQUEST_ID", "Missing requestId", false);
  if (String(request.clientVersion) !== "1") throw amError_("INCOMPATIBLE_CLIENT", "Unsupported client version", false);
  return request;
}

function amValidateAttemptBatch_(payload) {
  if (!payload || typeof payload !== "object") throw amError_("INVALID_PAYLOAD", "Missing payload", false);
  if (typeof payload.sessionId !== "string" || typeof payload.studentId !== "string") throw amError_("INVALID_PAYLOAD", "Missing sessionId/studentId", false);
  if (!Array.isArray(payload.attempts) || payload.attempts.length === 0 || payload.attempts.length > AM_MAX_ATTEMPT_BATCH) throw amError_("INVALID_BATCH", "Attempts batch must contain 1-25 items", false);
  var ids = {};
  payload.attempts.forEach(function(attempt) {
    if (!attempt || typeof attempt.attemptId !== "string" || !attempt.attemptId) throw amError_("INVALID_ATTEMPT", "Attempt is missing attemptId", false);
    if (attempt.sessionId !== payload.sessionId || attempt.studentId !== payload.studentId) throw amError_("INVALID_ATTEMPT", "Attempt identity does not match batch", false);
    if (typeof attempt.skillId !== "string" || typeof attempt.correct !== "boolean" || typeof attempt.scoreValue !== "number") throw amError_("INVALID_ATTEMPT", "Attempt fields are invalid", false);
    if (attempt.supportingSkills !== undefined && (!Array.isArray(attempt.supportingSkills) || attempt.supportingSkills.some(function(skillId) { return typeof skillId !== "string" || !skillId; }))) throw amError_("INVALID_ATTEMPT", "supportingSkills must contain Skill IDs", false);
    if (attempt.literacyDemand !== undefined && ["none", "light", "moderate", "high"].indexOf(attempt.literacyDemand) < 0) throw amError_("INVALID_ATTEMPT", "literacyDemand is invalid", false);
    if (ids[attempt.attemptId]) throw amError_("DUPLICATE_IN_BATCH", "Duplicate attemptId inside batch", false);
    ids[attempt.attemptId] = true;
  });
  return payload;
}

function amPartitionAttempts_(attempts, existingIds) {
  var existing = {};
  existingIds.forEach(function(id) { existing[String(id)] = true; });
  var accepted = [];
  var duplicates = [];
  attempts.forEach(function(attempt) {
    if (existing[attempt.attemptId]) duplicates.push(attempt.attemptId);
    else { accepted.push(attempt); existing[attempt.attemptId] = true; }
  });
  return { accepted: accepted, duplicateAttemptIds: duplicates };
}

function amAffectedSkillKeys_(attempts) {
  var keys = {};
  attempts.forEach(function(attempt) { keys[attempt.studentId + "||" + attempt.skillId] = true; });
  return Object.keys(keys).sort();
}

function amUpsertById_(rows, idField, incoming) {
  var map = {};
  rows.forEach(function(row) { map[String(row[idField])] = row; });
  incoming.forEach(function(row) { map[String(row[idField])] = row; });
  return Object.keys(map).sort().map(function(key) { return map[key]; });
}

function amProjectMastery_(studentId, skillId, attempts, calculatedAt) {
  var matching = attempts.filter(function(a) { return a.studentId === studentId && a.skillId === skillId; })
    .sort(function(a, b) { return String(a.submittedAt).localeCompare(String(b.submittedAt)) || Number(a.sequenceNumber) - Number(b.sequenceNumber); });
  var recent = matching.slice(-AM_MASTERY_CONFIG.recentWindow);
  var history = matching.slice(-AM_MASTERY_CONFIG.historyWindow);
  function average(items, selector) { return items.length ? items.reduce(function(sum, item) { return sum + selector(item); }, 0) / items.length : 0; }
  var recentAverage = average(recent, function(a) { return Number(a.scoreValue); });
  var historyAverage = average(history, function(a) { return Number(a.scoreValue); });
  var count = matching.length;
  var fluencyValues = history.filter(function(a) { return a.correct && a.supportLevel === "independent"; })
    .slice(-10).map(function(a) { return Number(a.responseTimeMs); }).sort(function(a,b){return a-b;});
  var fluency = "";
  if (fluencyValues.length) {
    var middle = Math.floor(fluencyValues.length / 2);
    fluency = fluencyValues.length % 2 ? fluencyValues[middle] : (fluencyValues[middle - 1] + fluencyValues[middle]) / 2;
  }
  return {
    studentId: studentId, skillId: skillId,
    mastery: 100 * (AM_MASTERY_CONFIG.recentWeight * recentAverage + AM_MASTERY_CONFIG.historyWeight * historyAverage),
    accuracy: 100 * average(history, function(a) { return a.correct ? 1 : 0; }),
    fluencyMedianMs: fluency, attemptCount: count, recentAverage: recentAverage, historyAverage: historyAverage,
    evidenceLevel: count >= 10 ? "established" : count >= 5 ? "emerging" : "insufficient",
    lastAttemptAt: count ? matching[count - 1].submittedAt : "", calculatedAt: calculatedAt, updatedAt: calculatedAt
  };
}

function amError_(code, message, retryable) {
  var error = new Error(message); error.amCode = code; error.amRetryable = retryable; return error;
}
