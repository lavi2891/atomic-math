type Level = "debug" | "info" | "warn" | "error";

const isDev = import.meta.env.DEV;

function fmt(scope: string | undefined, args: unknown[]) {
  return scope ? [`[${scope}]`, ...args] : args;
}

function shouldLog(level: Level) {
  if (isDev) return true;
  return level === "error";
}

export const log = {
  debug: (scope: string | undefined, ...args: unknown[]) => {
    if (shouldLog("debug")) console.debug(...fmt(scope, args));
  },
  info: (scope: string | undefined, ...args: unknown[]) => {
    if (shouldLog("info")) console.info(...fmt(scope, args));
  },
  warn: (scope: string | undefined, ...args: unknown[]) => {
    if (shouldLog("warn")) console.warn(...fmt(scope, args));
  },
  error: (scope: string | undefined, ...args: unknown[]) => {
    if (shouldLog("error")) console.error(...fmt(scope, args));
  },
};
