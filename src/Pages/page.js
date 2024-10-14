import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './page.css';
import Serch from '../assets/serch-mood.png';
import { fetchMovies } from '../api/apimovie';  

let MoviesPage = () => {
  let [movies, setMovies] = useState([]);
  let [searchMovieTerm, setSearchMovieTerm] = useState('');
  let [loading, setLoading] = useState(false);
  let [moviePage, setMoviePage] = useState(1);
  let [hasMoreMovies, setHasMoreMovies] = useState(true);
  let [error, setError] = useState(null); 
  let navigate = useNavigate(); 

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovies(moviePage, searchMovieTerm);  
        setMovies(prevMovies => (moviePage === 1 ? data.results : [...prevMovies, ...data.results]));
        setHasMoreMovies(data.page < data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [searchMovieTerm, moviePage]);

  let handleMovieSearchChange = (event) => {
    setSearchMovieTerm(event.target.value);
  };

  let handleMovieSearch = () => {
    setMovies([]); 
    setMoviePage(1); 
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
    }
  };

  return (
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
        {loading && <p className="celestial-note">Loading movies...</p>}  {}
        {error && <p className="celestial-note">{error}</p>}  {}
        {!loading && !error && movies.length === 0 && (
          <p className="celestial-note">No movies found.</p>  
        )}

        {movies.length > 0 && !loading && !error && (
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <div key={index} className="star-card" onClick={() => navigate(`/movies/${movie.id}`)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="galaxy-info">
                  <h3>{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
        {hasMoreMovies && !loading && (
          <button onClick={loadMoreMovies} className="infinity-button">
            Load More Movies
          </button>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
