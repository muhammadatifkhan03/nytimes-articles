import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ArticleList from "../ArticleList";
import { fetchMostViewedArticles } from "../../services/api";

// Mock the API module
jest.mock("../../services/api");

describe("ArticleList", () => {
  const mockArticles = [
    {
      id: 1,
      title: "Test Article 1",
      byline: "By Author 1",
      published_date: "2024-03-06",
      url: "test-article-1",
    },
    {
      id: 2,
      title: "Test Article 2",
      byline: "By Author 2",
      published_date: "2024-03-06",
      url: "test-article-2",
    },
  ];

  beforeEach(() => {
    fetchMostViewedArticles.mockClear();
  });

  it("renders loading state initially", () => {
    fetchMostViewedArticles.mockImplementation(() => new Promise(() => {}));
    render(
      <BrowserRouter>
        <ArticleList />
      </BrowserRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders articles after successful fetch", async () => {
    fetchMostViewedArticles.mockResolvedValue(mockArticles);
    render(
      <BrowserRouter>
        <ArticleList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("article-list")).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("article-item")).toHaveLength(2);
  });

  it("renders error message on fetch failure", async () => {
    fetchMostViewedArticles.mockRejectedValue(new Error("Failed to fetch"));
    render(
      <BrowserRouter>
        <ArticleList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });

  it("changes period and refetches articles", async () => {
    fetchMostViewedArticles.mockResolvedValue(mockArticles);
    render(
      <BrowserRouter>
        <ArticleList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("article-list")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("period-select"), {
      target: { value: "30" },
    });

    expect(fetchMostViewedArticles).toHaveBeenCalledWith(30);
  });
});
