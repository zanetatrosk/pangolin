import { afterEach, describe, expect, it, vi } from "vitest";

import { transformEventToCard } from "./transformEventToCard";

vi.mock("@/utils/getLabelFromPrice", () => ({
  getLabelFromPrice: vi.fn(() => "12.00 EUR"),
}));

vi.mock("@/utils/renderAdress", () => ({
  renderAddress: vi.fn(() => "Prague, CZ"),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("transformEventToCard", () => {
  it("transforms an event into card props and uses helper formatters", async () => {
    const { getLabelFromPrice } = await import("@/utils/getLabelFromPrice");
    const { renderAddress } = await import("@/utils/renderAdress");

    const dateSpy = vi
      .spyOn(Date.prototype, "toLocaleDateString")
      .mockReturnValue("Mar 30, 2026");

    const event = {
      id: "e1",
      eventName: "Salsa Night",
      description: "Fun social",
      date: "2026-03-30T12:00:00.000Z",
      time: "20:00",
      location: { city: "Prague" },
      price: 12,
      currency: "EUR",
      promoMedia: { url: "https://example.com/promo.jpg" },
      attendees: 42,
      maxAttendees: 100,
      organizer: { username: "Alice" },
      tags: ["bachata"],
    } as any;

    const card = transformEventToCard(event);

    expect(renderAddress).toHaveBeenCalledTimes(1);
    expect(renderAddress).toHaveBeenCalledWith(event.location);

    expect(getLabelFromPrice).toHaveBeenCalledTimes(1);
    expect(getLabelFromPrice).toHaveBeenCalledWith(event.price, event.currency);

    expect(dateSpy).toHaveBeenCalledTimes(1);
    expect(card).toEqual({
      id: "e1",
      title: "Salsa Night",
      description: "Fun social",
      date: "Mar 30, 2026",
      time: "20:00",
      location: "Prague, CZ",
      price: "12.00 EUR",
      image: "https://example.com/promo.jpg",
      attendees: 42,
      maxAttendees: 100,
      instructor: "Alice",
      tags: ["bachata"],
    });
  });

  it("falls back to defaults when optional fields are missing", () => {
    vi.spyOn(Date.prototype, "toLocaleDateString").mockReturnValue("Mar 30, 2026");

    const event = {
      id: "e2",
      eventName: "No Frills",
      date: "2026-03-30T12:00:00.000Z",
      time: "10:00",
      location: null,
      price: undefined,
      currency: undefined,
      promoMedia: undefined,
      attendees: undefined,
      maxAttendees: undefined,
      organizer: undefined,
      tags: undefined,
      description: undefined,
    } as any;

    const card = transformEventToCard(event);

    expect(card.description).toBe("");
    expect(card.attendees).toBe(0);
    expect(card.maxAttendees).toBe(0);
    expect(card.instructor).toBe("Unknown");
    expect(card.tags).toEqual([]);
    expect(card.image).toBeUndefined();
  });
});
