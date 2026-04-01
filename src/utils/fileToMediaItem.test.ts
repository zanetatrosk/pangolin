import { afterEach, describe, expect, it, vi } from "vitest";

import { fileToMediaItem } from "./fileToMediaItem";

afterEach(() => {
  vi.restoreAllMocks();
  // Clean up our temporary URL.createObjectURL override if present.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((URL as any).createObjectURL?.mock) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (URL as any).createObjectURL;
  }
});

describe("fileToMediaItem", () => {
  it("creates a video media item when file is video/*", () => {
    vi.spyOn(Date, "now").mockReturnValue(123);

    const createObjectURL = vi.fn(() => "blob:video");
    // Vitest runs in Node; URL.createObjectURL may be missing.
    Object.defineProperty(URL, "createObjectURL", {
      value: createObjectURL,
      configurable: true,
      writable: true,
    });

    const file = { type: "video/mp4" } as any as File;
    const item = fileToMediaItem(file);

    expect(createObjectURL).toHaveBeenCalledWith(file);
    expect(item).toEqual({
      id: 123,
      type: "video",
      url: "blob:video",
    });
  });

  it("creates an image media item when file is not video/*", () => {
    vi.spyOn(Date, "now").mockReturnValue(456);

    const createObjectURL = vi.fn(() => "blob:image");
    Object.defineProperty(URL, "createObjectURL", {
      value: createObjectURL,
      configurable: true,
      writable: true,
    });

    const file = { type: "image/png" } as any as File;
    const item = fileToMediaItem(file);

    expect(item).toEqual({
      id: 456,
      type: "image",
      url: "blob:image",
    });
  });
});
