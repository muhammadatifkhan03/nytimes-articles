import axios from 'axios';

const API_KEY = import.meta.env.VITE_NY_TIMES_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2';

export const fetchMostViewedArticles = async (period = 7) => {
  try {
    const response = await axios.get(`${BASE_URL}/viewed/${period}.json`, {
      params: {
        'api-key': API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticleDetails = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/article/${url}.json`, {
      params: {
        'api-key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching article details:', error);
    throw error;
  }
}; 