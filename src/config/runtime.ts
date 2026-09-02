export const runtimeConfig = {
  appsScriptUrl: (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined)?.trim() || null,
  studentId: (import.meta.env.VITE_STUDENT_ID as string | undefined)?.trim() || "local-student",
};

export interface StudentIdentityProvider { getStudentId(): string; }
export const studentIdentityProvider: StudentIdentityProvider = {
  getStudentId: () => runtimeConfig.studentId,
};
