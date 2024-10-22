import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTvShows } from '../api/Series';  
import './page.css';
import Serch from '../assets/serch-mood.png';

let SeriesPage = () => {
  let [tvShows, setTvShows] = useState([]);
  let [searchTvTerm, setSearchTvTerm] = useState('');
  let [loading, setLoading] = useState(false);
  let [tvPage, setTvPage] = useState(1);
  let [hasMoreTvShows, setHasMoreTvShows] = useState(true);
  let [error, setError] = useState(null); 
  let navigate = useNavigate(); 

  useEffect(() => {
    handleFetchTvShows(tvPage, searchTvTerm);
  }, [searchTvTerm, tvPage]);

  let handleFetchTvShows = async (page, query) => {
    setLoading(true);
    setError(null); 
    try {
      let data = await fetchTvShows(page, query);
      setTvShows(prevTvShows => (page === 1 ? data.results : [...prevTvShows, ...data.results])); 
      setHasMoreTvShows(data.page < data.total_pages);
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  let handleTvSearchChange = (event) => {
    setSearchTvTerm(event.target.value);
  };

  let handleTvSearch = () => {
    setTvShows([]); 
    setTvPage(1); 
    handleFetchTvShows(1, searchTvTerm);
    window.scrollTo(0, 0);
  };

  let handleKeyPressTv = (event) => {
    if (event.key === 'Enter') {
      handleTvSearch();
    }
  };

  let loadMoreTvShows = () => {
    if (hasMoreTvShows) {
      setTvPage(prevPage => prevPage + 1);
      handleFetchTvShows(tvPage + 1, searchTvTerm);
    }
  };

  let openDetailsPage = (item) => {
    navigate('/series-details', { state: { show: item } });
  };

  return (
    <div className="space-capsule">
      <div className="cosmic-zone">
        <div className="quantum-search">
          <h2>Search Serials</h2>
          <input
            type="text"
            placeholder="Search for a Serials..."
            value={searchTvTerm}
            onChange={handleTvSearchChange}
            onKeyPress={handleKeyPressTv}
          />
          <button onClick={handleTvSearch} className="search-button">
            <img src={Serch} height='20px' alt="search icon" />
          </button>
        </div>

        <h2>Serials</h2>
        {loading && <p className="celestial-note">Loading Serials...</p>}  
        {error && <p className="celestial-note">{error}</p>}  
        {!loading && !error && tvShows.length === 0 && (
          <p className="celestial-note">No Serials found.</p>  
        )}

        {tvShows.length > 0 && !loading && !error && (
          <div className="movies-grid">
            {tvShows.map((show, index) => (
              <div key={index} className="star-card" onClick={() => openDetailsPage(show)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                />
                <div className="galaxy-info">
                  <h3>{show.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
        {hasMoreTvShows && !loading && (
          <button onClick={loadMoreTvShows} className="infinity-button">
            Load More Serials
          </button>
        )}
      </div>
    </div>
  );
};

export default SeriesPage;
