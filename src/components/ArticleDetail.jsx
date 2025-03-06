import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ArticleDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 font-medium mb-2">Article Not Found</div>
        <p className="text-red-500 mb-4">This article could not be found.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Articles List
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 group"
      >
        <svg
          className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Articles
      </button>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
          <span>{article.byline}</span>
          <span>•</span>
          <span>{new Date(article.published_date).toLocaleDateString()}</span>
          {article.section && (
            <>
              <span>•</span>
              <span>{article.section}</span>
            </>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {article.media?.[0]?.["media-metadata"]?.[2]?.url && (
        <div className="relative mb-8">
          <img
            src={article.media[0]["media-metadata"][2].url}
            alt={article.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {article.media[0].caption && (
            <p className="mt-2 text-sm text-gray-500 italic">
              {article.media[0].caption}
            </p>
          )}
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          {article.abstract}
        </p>
        {article.des_facet && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Topics:
            </h2>
            <div className="flex flex-wrap gap-2">
              {article.des_facet.map((topic, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Read Full Article on NY Times
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </footer>
    </article>
  );
};

export default ArticleDetail;
