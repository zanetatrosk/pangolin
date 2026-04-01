import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  redirect: vi.fn((opts: any) => ({ __redirect: true, ...opts })),
}));

vi.mock("@/stores/authStore", () => ({
  authStore: { state: {} },
  selectIsAuthenticated: vi.fn(),
}));

vi.mock("@/paths", () => ({
  PATHS: { LOGIN: "/login" },
}));

describe("requireAuth", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("throws a redirect to login when not authenticated", async () => {
    const { selectIsAuthenticated } = await import("@/stores/authStore");
    (selectIsAuthenticated as any).mockReturnValue(false);

    const [{ requireAuth }, { redirect }] = await Promise.all([
      import("./requireAuth"),
      import("@tanstack/react-router"),
    ]);

    await expect(requireAuth({ location: { href: "/events?x=1" } })).rejects.toMatchObject(
      {
        __redirect: true,
        to: "/login",
        search: { redirect: "/events?x=1" },
      }
    );

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith({
      to: "/login",
      search: { redirect: "/events?x=1" },
    });
  });

  it("does nothing when authenticated", async () => {
    const { selectIsAuthenticated } = await import("@/stores/authStore");
    (selectIsAuthenticated as any).mockReturnValue(true);

    const [{ requireAuth }, { redirect }] = await Promise.all([
      import("./requireAuth"),
      import("@tanstack/react-router"),
    ]);

    await expect(requireAuth({ location: { href: "/events" } })).resolves.toBeUndefined();
    expect(redirect).not.toHaveBeenCalled();
  });
});
