import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMostViewedArticles } from "../services/api";
import ArticleListItem from "./ArticleListItem";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMostViewedArticles(period);
        setArticles(data);
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [period]);

  const handleArticleClick = (article) => {
    navigate(`/article/${encodeURIComponent(article.url)}`, {
      state: { article },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center" data-testid="error-message">
        <div className="text-red-600 font-medium mb-2">Error</div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="article-list">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Most Viewed Articles
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Discover the most engaging stories from The New York Times
          </p>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <label htmlFor="period" className="text-sm font-medium text-gray-700">
            Time Period:
          </label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            data-testid="period-select"
          >
            <option value={1}>Last 24 Hours</option>
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article}
            onClick={handleArticleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
