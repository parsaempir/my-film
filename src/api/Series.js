import axios from 'axios';
import { API_KEY, BASE_URL, DEFAULT_LANGUAGE } from '../constants/api'; 

export let fetchTvShows = async (page, query) => {
  try {
    let response;
    if (query) {
      response = await axios.get(`${BASE_URL}/search/tv`, {
        params: {
          api_key: API_KEY,
          language: DEFAULT_LANGUAGE,
          query,
          page,
        },
      });
    } else {
      response = await axios.get(`${BASE_URL}/discover/tv`, {
        params: {
          api_key: API_KEY,
          language: DEFAULT_LANGUAGE,
          sort_by: 'popularity.desc',
          page,
        },
      });
    }
    return response.data;
  } catch (error) {
    throw new Error('Error fetching TV shows. Please try again later.');
  }
};
