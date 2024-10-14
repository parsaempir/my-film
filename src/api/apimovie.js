import axios from 'axios';

let API_KEY = 'e8847ea985283735785e736b20c0ac34';

export let fetchMovies = async (page, query) => {
  try {
    let response;
    if (query) {
      response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          query,
          page,
        },
      });
    } else {
      response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          sort_by: 'popularity.desc',
          page,
        },
      });
    }
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};
