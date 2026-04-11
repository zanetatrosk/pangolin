import { describe, expect, it, vi } from "vitest";

// `attendeeUtils.ts` imports `RegistrationModeEnum` from a React component module.
// Mock it here so this unit test stays lightweight and doesn't depend on UI imports.
vi.mock("../publish-actions/PublishEventOptions", () => ({
  RegistrationModeEnum: {
    OPEN: "OPEN",
    COUPLE: "COUPLE",
    GOOGLE_FORM: "GOOGLE_FORM",
  },
}));

describe("preprocessAttendees", () => {
  it("maps registrations to attendees and derives role only in COUPLE mode", async () => {
    const [{ preprocessAttendees }, { RegistrationModeEnum }] = await Promise.all([
      import("./attendeeUtils"),
      import("../publish-actions/PublishEventOptions"),
    ]);

    const attendees = preprocessAttendees(
      [
        {
          registrationId: "r1",
          user: { userId: "u1", name: "Alice", avatar: "alice.png" },
          role: "leader",
          level: "Beginner",
        },
        {
          registrationId: "r2",
          user: { userId: "u2", name: "Bob" },
          role: "Follower",
          level: null,
        },
        {
          registrationId: "r3",
          user: null,
          role: "something-else",
          level: "Advanced",
        },
        {
          registrationId: "r4",
          user: null,
          role: "something-else",
          level: undefined,
        },
      ],
      RegistrationModeEnum.COUPLE
    );

    expect(attendees).toEqual([
      {
        id: "r1",
        name: "Alice",
        userId: "u1",
        role: "Leader",
        avatar: "alice.png",
        level: "Beginner",
      },
      {
        id: "r2",
        name: "Bob",
        userId: "u2",
        role: "Follower",
        avatar: undefined,
        level: null,
      },
      {
        id: "r3",
        name: "Anonymous Guest 3",
        userId: undefined,
        role: undefined,
        avatar: undefined,
        level: "Advanced",
      },
      {
        id: "r4",
        name: "Anonymous Guest 4",
        userId: undefined,
        role: undefined,
        avatar: undefined,
        level: undefined,
      },
    ]);
  });

  it("does not set role in OPEN mode even if registration includes role", async () => {
    const [{ preprocessAttendees }, { RegistrationModeEnum }] = await Promise.all([
      import("./attendeeUtils"),
      import("../publish-actions/PublishEventOptions"),
    ]);

    const attendees = preprocessAttendees(
      [
        {
          registrationId: "r1",
          user: { userId: "u1", name: "Alice" },
          role: "leader",
          level: "Beginner",
        },
      ],
      RegistrationModeEnum.OPEN
    );

    expect(attendees[0]?.role).toBeUndefined();
    expect(attendees[0]?.name).toBe("Alice");
    expect(attendees[0]?.id).toBe("r1");
  });
});
