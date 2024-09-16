import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './page.css';
import Serch from './serch-mood.png';

let TheSecondPage = () => {
  let [results, setResults] = useState([]); 
  let [searchTerm, setSearchTerm] = useState('');
  let [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [hasMore, setHasMore] = useState(true);
  let [selectedItem, setSelectedItem] = useState(null);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  let fetchGenres = async () => {
    try {
      let movieGenresResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: 'e8847ea985283735785e736b20c0ac34',
          language: 'en-US',
        },
      });

      let tvGenresResponse = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
        params: {
          api_key: 'e8847ea985283735785e736b20c0ac34',
          language: 'en-US',
        },
      });

      setGenres([...movieGenresResponse.data.genres, ...tvGenresResponse.data.genres]);
    } catch (error) {
      console.error('Error fetching genres', error);
    }
  };

  let fetchMoviesAndTvShows = async (page, query) => {
    setLoading(true);
    try {
      let movieResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'e8847ea985283735785e736b20c0ac34',
          language: 'en-US',
          query,
          page,
        },
      });

      let tvResponse = await axios.get('https://api.themoviedb.org/3/search/tv', {
        params: {
          api_key: 'e8847ea985283735785e736b20c0ac34',
          language: 'en-US',
          query,
          page,
        },
      });

      let combinedResults = [...movieResponse.data.results, ...tvResponse.data.results];

      setResults(prevResults => [...prevResults, ...combinedResults]);
      setHasMore(movieResponse.data.page < movieResponse.data.total_pages || tvResponse.data.page < tvResponse.data.total_pages);
    } catch (error) {
      console.error('Error fetching movies and TV shows', error);
    } finally {
      setLoading(false);
    }
  };

  let handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let handleSearch = () => {
    setResults([]);
    setPage(1);
    fetchMoviesAndTvShows(1, searchTerm);
    window.scrollTo(0, 0);
  };

  let handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  let loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
      fetchMoviesAndTvShows(page + 1, searchTerm);
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

  return (
    <div className="space-capsule">
      <div className="cosmic-zone">
        <div className="quantum-search">
          <h2>Search Movies & Serials</h2>
          <input
            type="text"
            placeholder="Search for a movie or serial..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch} className="search-button">
            <img src={Serch} height="20px" alt="search icon" />
          </button>
        </div>

        {results.length > 0 && (
          <>
            <h2>Results</h2>
            {loading && !results.length ? (
              <p className="celestial-note">Loading...</p>
            ) : results.length === 0 ? (
              <p className="celestial-note">No results found.</p>
            ) : (
              results.map((item, index) => (
                <div key={index} className="star-card" onClick={() => openModal(item)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                  <div className="galaxy-info">
                    <h3>{item.title || item.name}</h3>
                  </div>
                </div>
              ))
            )}
            {hasMore && !loading && (
              <button onClick={loadMore} className="infinity-button">
                Load More
              </button>
            )}
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Item Details" className="nebula-window">
        {selectedItem && (
          <div className="nebula-core">
            <button className="portal-close" onClick={closeModal}>&times;</button>
            <h2>{selectedItem.title || selectedItem.name}</h2>
            <p>Overview:{selectedItem.overview}</p>
            <p><strong>Release Date:</strong> {selectedItem.release_date || selectedItem.first_air_date}</p>
            {selectedItem.genre_ids && (
              <p><strong>Genres:</strong> {selectedItem.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TheSecondPage;
