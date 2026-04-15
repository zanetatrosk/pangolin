import { isAxiosError } from "axios";

/**
 * Extracts a user-facing error message from unknown errors.
 *
 * Priority:
 * 1) Axios `response.data.message` (when it's a non-empty string)
 * 2) `Error.message` (when non-empty)
 * 3) `undefined`
 */
export const getRequestErrorMessage = (error: unknown): string | undefined => {
  if (!error) {
    return undefined;
  }

  if (isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;
    if (typeof responseMessage === "string" && responseMessage.trim().length > 0) {
      return responseMessage;
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return undefined;
};
