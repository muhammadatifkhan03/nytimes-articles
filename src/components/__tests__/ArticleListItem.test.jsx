import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ArticleListItem from "../ArticleListItem";

describe("ArticleListItem", () => {
  const mockArticle = {
    id: 1,
    title: "Test Article",
    byline: "By Test Author",
    published_date: "2024-03-06",
    media: [
      {
        "media-metadata": [
          {
            url: "https://example.com/image.jpg",
          },
        ],
      },
    ],
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders article information correctly", () => {
    render(<ArticleListItem article={mockArticle} onClick={mockOnClick} />);

    expect(screen.getByTestId("article-title")).toHaveTextContent(
      "Test Article"
    );
    expect(screen.getByTestId("article-byline")).toHaveTextContent(
      "By Test Author"
    );
    expect(screen.getByTestId("article-date")).toHaveTextContent("3/6/2024");
    expect(screen.getByTestId("article-image")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
  });

  it("renders placeholder image when no media is provided", () => {
    const articleWithoutMedia = { ...mockArticle, media: [] };
    render(
      <ArticleListItem article={articleWithoutMedia} onClick={mockOnClick} />
    );

    expect(screen.queryByTestId("article-image")).not.toBeInTheDocument();
    expect(screen.getByTestId("article-item")).toContainElement(
      screen.getByRole("img", { hidden: true })
    );
  });

  it("calls onClick handler when clicked", () => {
    render(<ArticleListItem article={mockArticle} onClick={mockOnClick} />);

    fireEvent.click(screen.getByTestId("article-item"));
    expect(mockOnClick).toHaveBeenCalledWith(mockArticle);
  });
});
