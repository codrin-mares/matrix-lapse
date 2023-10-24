export const APP_MODES = {
  DEV: 'development',
  TEST: 'testing',
  PROD: 'production',
} as const;

type ValueOf<T> = T[keyof T];

export type ApplicationMode = ValueOf<typeof APP_MODES>;
export const VALID_APP_MODES = Object.values(APP_MODES);