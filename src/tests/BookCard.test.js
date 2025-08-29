import { render, screen } from "@testing-library/react";
import BookCard from "../components/books/BookCard";

describe("BookCard", () => {
  it("renders book details correctly", () => {
    render(
      <BookCard
        title="Clean Code"
        author="Robert C. Martin"
        year={2008}
        coverId={12345}
      />
    );

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Robert C. Martin")).toBeInTheDocument();
    expect(screen.getByText("2008")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("12345-M.jpg")
    );
  });

  it("shows placeholder image if cover is missing", () => {
    render(<BookCard title="No Cover Book" author="Unknown" year={2020} />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("placeholder.jpg") // whatever your placeholder path is
    );
  });
});
