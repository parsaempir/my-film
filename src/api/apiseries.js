import axios from 'axios';

let apiKey = 'e8847ea985283735785e736b20c0ac34';
let apiBaseUrl = 'https://api.themoviedb.org/3';

export let fetchTvShows = async (page, query) => {
  try {
    let response;
    if (query) {
      response = await axios.get(`${apiBaseUrl}/search/tv`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          query,
          page,
        },
      });
    } else {
      response = await axios.get(`${apiBaseUrl}/discover/tv`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
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
