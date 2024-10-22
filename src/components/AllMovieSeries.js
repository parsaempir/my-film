import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesAndTvShows } from '../api/Service';  
import '../Pages/MoviesPage.css';
import Serch from '../assets/serch-mood.png';

let TheAllMovieSeriesPage = () => {
  let [results, setResults] = useState([]);
  let [searchTerm, setSearchTerm] = useState('');
  let [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [hasMore, setHasMore] = useState(true);
  let [error, setError] = useState(null);
  let navigate = useNavigate();

  let handleSearch = async () => {
    setResults([]);
    setPage(1);
    setLoading(true);
    setError(null);
    try {
      let combinedResults = await fetchMoviesAndTvShows(1, searchTerm);
      setResults(combinedResults);
      setHasMore(combinedResults.length > 0);

      if (combinedResults.length === 0) {
        setError("No results found for your search.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  let handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  let loadMore = async () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
      try {
        let newResults = await fetchMoviesAndTvShows(page + 1, searchTerm);
        setResults(prevResults => [...prevResults, ...newResults]);
        setHasMore(newResults.length > 0);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  let openDetailsPage = (item) => {
    navigate('/details', { state: { item } }); 
  };

  return (
    <div className="space-capsule">
      <div className="cosmic-zone">
        <div className="quantum-search">
          <h2>Search Movies & Serials</h2>
          <input
            type="text"
            placeholder="Search for a movie or serial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch} className="search-button">
            <img src={Serch} height="20px" alt="search icon" />
          </button>
        </div>

        {loading && <p className="celestial-note">Loading...</p>}
        {error && <p className="celestial-note">{error}</p>}

        {!loading && !error && results.length === 0 && (
          <p className="celestial-note"></p>
        )}

        {results.length > 0 && !loading && !error && (
          <>
            <h2>Results</h2>
            {results.map((item, index) => (
              <div key={index} className="star-card" onClick={() => openDetailsPage(item)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <div className="galaxy-info">
                  <h3>{item.title || item.name}</h3>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TheAllMovieSeriesPage;
