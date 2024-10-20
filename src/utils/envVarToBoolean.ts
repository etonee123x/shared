export const envVarToBoolean = (envVar: unknown): boolean => ['true', 'TRUE'].includes(String(envVar));
