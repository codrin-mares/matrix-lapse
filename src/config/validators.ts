import { ApplicationMode, VALID_APP_MODES } from "./constants";

const env = import.meta.env;

export const extractStringEnvVar = (key: keyof NodeJS.ProcessEnv): string => {
  const value = env[key];

  if (value === undefined) {
    const message = `The environment variable "${key}" cannot be "undefined".`;

    throw new Error(message);
  }

  return value;
};

export const extractNumberEnvVar = (key: keyof NodeJS.ProcessEnv): number => {
  const stringValue = extractStringEnvVar(key);

  const numberValue = parseFloat(stringValue);

  if (Number.isNaN(numberValue)) {
    const message = `The environment variable "${key}" has to hold a stringified number value - not ${stringValue}`;

    throw new Error(message);
  }

  return numberValue;
};

const booleanMap = {
  true: true,
  false: false,
};

const isObjKey = <T extends object>(key: PropertyKey, obj: T): key is keyof T =>
  key in obj;

export const extractBooleanEnvVar = (key: keyof NodeJS.ProcessEnv): boolean => {
  const stringValue = extractStringEnvVar(key);

  if (!isObjKey(stringValue, booleanMap)) {
    const message = `The environment variable "${key}" has to hold a stringified "true" or "false" value - not ${stringValue}.`;

    throw new Error(message);
  }

  return booleanMap[stringValue];
};

export const extractApplicationMode = (): ApplicationMode => {
  const mode = env.MODE;

  if (!VALID_APP_MODES.find(m => m === mode)) {
    throw new Error(`Application mode = ${mode} is not one of: ${VALID_APP_MODES.join(', ')}!`)
  }

  return mode as ApplicationMode;
}