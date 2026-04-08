type UnknownError = unknown;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const toMessage = (error: UnknownError): string | undefined => {
  if (typeof error === "string") {
    return error;
  }

  if (isRecord(error) && typeof error.message === "string") {
    return error.message;
  }

  return undefined;
};

export const getFirstErrorMessage = (errors: UnknownError[]): string | undefined => {
  for (const error of errors) {
    const message = toMessage(error);
    if (message) {
      return message;
    }
  }

  return undefined;
};
