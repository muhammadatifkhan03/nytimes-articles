import React from "react";
import PropTypes from "prop-types";

const ArticleListItem = ({ article, onClick }) => {
  return (
    <div
      onClick={() => onClick(article)}
      className="cursor-pointer group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
      data-testid="article-item"
    >
      <div className="aspect-w-16 aspect-h-9">
        {article.media?.[0]?.["media-metadata"]?.[0]?.url ? (
          <img
            src={article.media[0]["media-metadata"][0].url}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            data-testid="article-image"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2"
          data-testid="article-title"
        >
          {article.title}
        </h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <span data-testid="article-byline">{article.byline}</span>
          <span className="mx-2">•</span>
          <span data-testid="article-date">
            {new Date(article.published_date).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-3 flex items-center text-sm text-blue-600 group-hover:text-blue-700">
          Read more
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

ArticleListItem.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    byline: PropTypes.string.isRequired,
    published_date: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        "media-metadata": PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          })
        ),
      })
    ),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ArticleListItem;
