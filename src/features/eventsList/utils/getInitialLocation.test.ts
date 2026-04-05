import { describe, expect, it } from "vitest";

import { getInitialLocation } from "./getInitialLocation";

describe("getInitialLocation", () => {
  it("returns undefined when initialSearchParams is missing", () => {
    expect(getInitialLocation(undefined)).toBeUndefined();
  });

  it("returns undefined when both city and country are empty", () => {
    expect(getInitialLocation({} as any)).toBeUndefined();
    expect(getInitialLocation({ city: "   ", country: "\n\t" } as any)).toBeUndefined();
  });

  it("builds a PlaceOption when only city is provided", () => {
    const result = getInitialLocation({ city: "Prague" } as any);

    expect(result).toEqual({
      value: "Prague",
      label: "Prague",
      locationData: {
        name: "",
        street: "",
        city: "Prague",
        state: "",
        country: "",
        postalCode: "",
        houseNumber: "",
      },
    });
  });

  it("builds a PlaceOption when only country is provided", () => {
    const result = getInitialLocation({ country: "Czechia" } as any);

    expect(result).toEqual({
      value: "Czechia",
      label: "Czechia",
      locationData: {
        name: "",
        street: "",
        city: "",
        state: "",
        country: "Czechia",
        postalCode: "",
        houseNumber: "",
      },
    });
  });

  it("trims city/country and joins them with a comma", () => {
    const result = getInitialLocation({
      city: "  Prague ",
      country: " Czechia  ",
      state: "  Central Bohemia ",
    } as any);

    expect(result).toEqual({
      value: "Prague, Czechia",
      label: "Prague, Czechia",
      locationData: {
        name: "",
        street: "",
        city: "Prague",
        // Note: state is not trimmed in the implementation.
        state: "  Central Bohemia ",
        country: "Czechia",
        postalCode: "",
        houseNumber: "",
      },
    });
  });
});
