function configuredValue(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const runtimeConfig = {
  appsScriptUrl: configuredValue(import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined),
  /** Explicit development/test fallback only. Classroom builds should leave this unset. */
  fallbackStudentId: configuredValue(import.meta.env.VITE_STUDENT_ID as string | undefined),
};

export const backendConfigured = runtimeConfig.appsScriptUrl !== null;
