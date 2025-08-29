import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useOpenLibrarySearch from "../hooks/useOpenLibrarySearch";

global.fetch = jest.fn();

describe("useOpenLibrarySearch", () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it("fetches books by title", async () => {
    const mockData = {
      docs: [
        {
          title: "Harry Potter",
          author_name: ["J.K. Rowling"],
          first_publish_year: 1997,
        },
      ],
    };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });

    const { result, waitForNextUpdate } = renderHook(() =>
      useOpenLibrarySearch("harry potter")
    );

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data.docs[0].title).toBe("Harry Potter");
    expect(result.current.loading).toBe(false);
  });

  it("handles fetch error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useOpenLibrarySearch("harry potter")
    );

    await waitForNextUpdate();

    expect(result.current.error).toBeTruthy();
  });
});
