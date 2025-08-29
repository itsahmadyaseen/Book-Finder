import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/books/SearchBar";

describe("SearchBar", () => {
  it("allows typing and calls onSearch", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search by title/i);
    await userEvent.type(input, "harry potter");

    expect(input.value).toBe("harry potter");
    // debounce → simulate enter key
    await userEvent.keyboard("{Enter}");
    expect(mockOnSearch).toHaveBeenCalledWith("harry potter");
  });
});
