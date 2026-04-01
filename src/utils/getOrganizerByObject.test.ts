import { describe, expect, it } from "vitest";

import { getOrganizerByObject } from "./getOrganizerByObject";

describe("getOrganizerByObject", () => {
  it("returns @username when firstName or lastName is missing", () => {
    expect(
      getOrganizerByObject({ username: "alice", firstName: "Alice" } as any)
    ).toBe("@alice");
    expect(
      getOrganizerByObject({ username: "bob", lastName: "Doe" } as any)
    ).toBe("@bob");
  });

  it("returns full name when firstName and lastName are present", () => {
    expect(
      getOrganizerByObject({
        username: "alice",
        firstName: "Alice",
        lastName: "Doe",
      } as any)
    ).toBe("Alice Doe");
  });
});
