import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

global.fetch = jest.fn();

describe("Book Finder App", () => {
  it("searches and displays results", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        docs: [
          {
            title: "Test Book",
            author_name: ["Author X"],
            first_publish_year: 2000,
          },
        ],
      }),
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/search by title/i);
    await userEvent.type(input, "test{Enter}");

    await waitFor(() => screen.getByText("Test Book"));

    expect(screen.getByText("Author X")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
  });

  it("shows no results message", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ docs: [] }) });

    render(<App />);

    const input = screen.getByPlaceholderText(/search by title/i);
    await userEvent.type(input, "unknown{Enter}");

    await waitFor(() => screen.getByText(/no books found/i));
  });
});
