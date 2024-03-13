import { EnvVariableMissingError } from "../utils/errors";

export const getEnvVar = (name: string): string => {
  if (!process.env[name]) {
    throw new EnvVariableMissingError(name);
  }
  return process.env[name]!;
};
