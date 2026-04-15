import { describe, expect, it } from "vitest";
import { AxiosError } from "axios";
import { getRequestErrorMessage } from "./getRequestErrorMessage";

describe("getRequestErrorMessage", () => {
  it("returns axios response.data.message when present", () => {
    const error = new AxiosError(
      "boom",
      "500",
      undefined,
      undefined,
      {
        data: { message: "Server says nope" },
        status: 500,
        statusText: "Internal Server Error",
        headers: {},
        config: {},
      } as any,
    );

    expect(getRequestErrorMessage(error)).toBe("Server says nope");
  });

  it("falls back to Error.message", () => {
    expect(getRequestErrorMessage(new Error("Plain error"))).toBe("Plain error");
  });

  it("returns undefined for empty/unknown errors", () => {
    expect(getRequestErrorMessage(undefined)).toBeUndefined();
    expect(getRequestErrorMessage(null)).toBeUndefined();
    expect(getRequestErrorMessage({})).toBeUndefined();
  });
});
