import { describe, expect, it } from "vitest";

import { isUserOrganizer } from "./isUserOrganizer";

describe("isUserOrganizer", () => {
  it("returns true when userId matches organizerId", () => {
    expect(isUserOrganizer("u1", "u1")).toBe(true);
  });

  it("returns false when userId does not match organizerId or is missing", () => {
    expect(isUserOrganizer("u1", "u2")).toBe(false);
    expect(isUserOrganizer("u1", undefined)).toBe(false);
  });
});
