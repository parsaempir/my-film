import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './page.css';
import Serch from './serch-mood.png';
import imgs from './img film.webp'
let MoviesPage = () => {
  let [movies, setMovies] = useState([]);
  let [searchMovieTerm, setSearchMovieTerm] = useState('');
  let [loading, setLoading] = useState(false);
  let [moviePage, setMoviePage] = useState(1);
  let [hasMoreMovies, setHasMoreMovies] = useState(true);
  let [selectedItem, setSelectedItem] = useState(null);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
    fetchMovies(moviePage, searchMovieTerm);
  }, [searchMovieTerm, moviePage]);

  let fetchGenres = async () => {
    try {
      let movieGenresResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: 'e8847ea985283735785e736b20c0ac34',
          language: 'en-US',
        },
      });
      setGenres(movieGenresResponse.data.genres);
    } catch (error) {
      console.error('Error fetching genres', error);
    }
  };

  let fetchMovies = async (page, query) => {
    setLoading(true);
    try {
      let response;
      if (query) {
        response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: 'e8847ea985283735785e736b20c0ac34',
            language: 'en-US',
            query,
            page,
          },
        });
      } else {
        response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: 'e8847ea985283735785e736b20c0ac34',
            language: 'en-US',
            sort_by: 'popularity.desc',
            page,
          },
        });
      }
      setMovies(prevMovies => [...prevMovies, ...response.data.results]);
      setHasMoreMovies(response.data.page < response.data.total_pages);
    } catch (error) {
      console.error('Error fetching movies', error);
    } finally {
      setLoading(false);
    }
  };

  let handleMovieSearchChange = (event) => {
    setSearchMovieTerm(event.target.value);
  };

  let handleMovieSearch = () => {
    setMovies([]);
    setMoviePage(1);
    fetchMovies(1, searchMovieTerm);
    window.scrollTo(0, 0);
  };

  let handleKeyPressMovie = (event) => {
    if (event.key === 'Enter') {
      handleMovieSearch();
    }
  };

  let loadMoreMovies = () => {
    if (hasMoreMovies) {
      setMoviePage(prevPage => prevPage + 1);
      fetchMovies(moviePage + 1, searchMovieTerm);
    }
  };

  let openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  let closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (<>

    <div className="space-capsule">
      <div className="cosmic-zone">
        <div className="quantum-search">
          <h2>Search Movies</h2>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchMovieTerm}
            onChange={handleMovieSearchChange}
            onKeyPress={handleKeyPressMovie}
          />
          <button onClick={handleMovieSearch} className="search-button">
            <img src={Serch} height='20px' alt="search icon" />
          </button>
        </div>

        <h2>Movies</h2>
        {loading && !movies.length ? (
          <p className="celestial-note">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="celestial-note">No movies found.</p>
        ) : (
          movies.map((movie, index) => (
            <div key={index} className="star-card" onClick={() => openModal(movie)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="galaxy-info">
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))
        )}
        {hasMoreMovies && !loading && (
          <button onClick={loadMoreMovies} className="infinity-button">
            Load More Movies
          </button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Movie Details" className="nebula-window">
        {selectedItem && (
          <div className="nebula-core">
            <button className="portal-close" onClick={closeModal}>&times;</button>
            <h2>{selectedItem.title}</h2>
            <p>Overview:{selectedItem.overview}</p>
            <p><strong>Release Date:</strong> {selectedItem.release_date}</p>
            {selectedItem.genre_ids && (
              <p><strong>Genres:</strong> {selectedItem.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')}</p>
            )}
          </div>
        )}
      </Modal>
    </div> </>
  );
};

export default MoviesPage;
