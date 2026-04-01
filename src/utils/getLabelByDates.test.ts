import { afterEach, describe, expect, it, vi } from "vitest";

import { getLabelByDates } from "./getLabelByDates";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getLabelByDates", () => {
  it("returns a single label when endDate is missing", () => {
    vi.spyOn(Date.prototype, "toDateString").mockImplementation(function () {
      return this.toISOString().slice(0, 10);
    });
    vi.spyOn(Date.prototype, "toLocaleDateString").mockImplementation(function () {
      return `L:${this.toISOString().slice(0, 10)}`;
    });

    expect(getLabelByDates("2026-03-30T12:00:00.000Z")).toBe("L:2026-03-30");
  });

  it("returns a single label when start and end are on same day", () => {
    vi.spyOn(Date.prototype, "toDateString").mockImplementation(function () {
      return this.toISOString().slice(0, 10);
    });
    vi.spyOn(Date.prototype, "toLocaleDateString").mockImplementation(function () {
      return `L:${this.toISOString().slice(0, 10)}`;
    });

    expect(
      getLabelByDates("2026-03-30T12:00:00.000Z", "2026-03-30T18:00:00.000Z")
    ).toBe("L:2026-03-30");
  });

  it("returns a range label when start and end are on different days", () => {
    vi.spyOn(Date.prototype, "toDateString").mockImplementation(function () {
      return this.toISOString().slice(0, 10);
    });
    vi.spyOn(Date.prototype, "toLocaleDateString").mockImplementation(function () {
      return `L:${this.toISOString().slice(0, 10)}`;
    });

    expect(
      getLabelByDates("2026-03-30T12:00:00.000Z", "2026-03-31T12:00:00.000Z")
    ).toBe("L:2026-03-30 - L:2026-03-31");
  });
});
