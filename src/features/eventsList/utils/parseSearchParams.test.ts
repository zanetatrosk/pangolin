import { describe, expect, it } from "vitest";

import {
  convertSearchParamsToQuery,
  parseArrayParamToQuery,
} from "./parseSearchParams";

describe("parseArrayParamToQuery", () => {
  it("returns empty string for null or empty values", () => {
    expect(parseArrayParamToQuery("eventTypes", null)).toBe("");
    expect(parseArrayParamToQuery("eventTypes", [])).toBe("");
  });

  it("builds a comma-separated query parameter", () => {
    expect(parseArrayParamToQuery("eventTypes", ["festival", "party"]))
      .toBe("&eventTypes=festival,party");
  });
});

describe("convertSearchParamsToQuery", () => {
  it("returns empty string when searchParams is missing", () => {
    expect(convertSearchParamsToQuery(undefined)).toBe("");
  });

  it("converts scalar params and array params into an encoded query string", () => {
    // Cast to avoid depending on the route module type at runtime.
    const query = convertSearchParamsToQuery({
      eventName: "Salsa Night",
      city: "Prague",
      country: "Czechia",
      eventTypes: ["festival", "party"],
      danceStyles: ["bachata"],
    } as any);

    expect(query).toBe(
      "&eventName=Salsa%20Night&city=Prague&country=Czechia&eventTypes=festival,party&danceStyles=bachata"
    );
  });

  it("omits unset properties", () => {
    const query = convertSearchParamsToQuery({
      eventName: "Test",
      eventTypes: null,
      danceStyles: [],
    } as any);

    expect(query).toBe("&eventName=Test");
  });
});
