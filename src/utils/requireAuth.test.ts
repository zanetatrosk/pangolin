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

const createSessionStorageMock = (): Storage => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => (key in store ? store[key] : null)),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    get length() {
      return Object.keys(store).length;
    },
  } as unknown as Storage;
};

describe("requireAuth", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    Object.defineProperty(globalThis, "sessionStorage", {
      value: createSessionStorageMock(),
      configurable: true,
    });
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
