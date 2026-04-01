import { describe, expect, it } from "vitest";

import { renderAddress } from "./renderAdress";

describe("renderAddress", () => {
  it("joins address parts and omits missing values", () => {
    const address = {
      name: "Studio",
      street: "Main St",
      houseNumber: "10",
      city: "Prague",
      county: undefined,
      state: "Prague",
      postalCode: "11000",
      country: "CZ",
    } as any;

    expect(renderAddress(address)).toBe("10, Main St, Prague, Prague, 11000, CZ");
  });

  it("filters out empty strings", () => {
    const address = {
      name: "Studio",
      street: "Main St",
      houseNumber: "",
      city: "Prague",
      county: "",
      state: "Prague",
      postalCode: "11000",
      country: "CZ",
    } as any;

    expect(renderAddress(address)).toBe("Main St, Prague, Prague, 11000, CZ");
  });
});
