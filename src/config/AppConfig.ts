import { ApplicationMode } from './constants';
import { extractApplicationMode, extractBooleanEnvVar, extractNumberEnvVar, extractStringEnvVar } from './validators';

export const APP_CONFIG: {
  MODE: ApplicationMode;
  TITLE: string;
  COUNT: number;
  ENABLE_FLAG: boolean;
} = {
  MODE: extractApplicationMode(),
  TITLE: extractStringEnvVar('VITE_TITLE'),
  COUNT: extractNumberEnvVar('VITE_COUNT'),
  ENABLE_FLAG: extractBooleanEnvVar('VITE_ENABLE_FLAG'),
};
