import axios from 'axios';

let API_KEY = 'e8847ea985283735785e736b20c0ac34';
let LANGUAGE = 'en-US';

export let fetchGenres = async () => {
  try {
    let movieGenresResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: { api_key: API_KEY, language: LANGUAGE },
    });

    let tvGenresResponse = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
      params: { api_key: API_KEY, language: LANGUAGE },
    });

    return [...movieGenresResponse.data.genres, ...tvGenresResponse.data.genres];
  } catch (error) {
    throw new Error('Error fetching genres');
  }
};

export let fetchMoviesAndTvShows = async (page, query) => {
  try {
    let movieResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: { api_key: API_KEY, language: LANGUAGE, query, page },
    });

    let tvResponse = await axios.get('https://api.themoviedb.org/3/search/tv', {
      params: { api_key: API_KEY, language: LANGUAGE, query, page },
    });

    return [...movieResponse.data.results, ...tvResponse.data.results];
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
