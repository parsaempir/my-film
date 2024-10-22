import axios from 'axios';
import { BASE_URL, API_KEY, DEFAULT_LANGUAGE } from '../constants/api'; 

export let fetchGenres = async () => {
  try {
    let movieGenresResponse = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY, language: DEFAULT_LANGUAGE },
    });

    let tvGenresResponse = await axios.get(`${BASE_URL}/genre/tv/list`, {
      params: { api_key: API_KEY, language: DEFAULT_LANGUAGE },
    });

    return [...movieGenresResponse.data.genres, ...tvGenresResponse.data.genres];
  } catch (error) {
    throw new Error('Error fetching genres');
  }
};

export let fetchMoviesAndTvShows = async (page, query) => {
  try {
    let movieResponse = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, language: DEFAULT_LANGUAGE, query, page },
    });

    let tvResponse = await axios.get(`${BASE_URL}/search/tv`, {
      params: { api_key: API_KEY, language: DEFAULT_LANGUAGE, query, page },
    });

    return [...movieResponse.data.results, ...tvResponse.data.results];
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
