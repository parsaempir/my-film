import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './page.css';
import Serch from './serch-mood.png';

let SeriesPage = () => {
  let [tvShows, setTvShows] = useState([]);
  let [searchTvTerm, setSearchTvTerm] = useState('');
  let [loading, setLoading] = useState(false);
  let [tvPage, setTvPage] = useState(1);
  let [hasMoreTvShows, setHasMoreTvShows] = useState(true);
  let [selectedItem, setSelectedItem] = useState(null);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
    fetchTvShows(tvPage, searchTvTerm);
  }, [searchTvTerm, tvPage]);

  let fetchGenres = async () => {
    try {
      let tvGenresResponse = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
        params: {
          api_key: 'e8847ea985283735785e736b20c0ac34',
          language: 'en-US',
        },
      });
      setGenres(tvGenresResponse.data.genres);
    } catch (error) {
      console.error('Error fetching genres', error);
    }
  };

  let fetchTvShows = async (page, query) => {
    setLoading(true);
    try {
      let response;
      if (query) {
        response = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
          params: {
            api_key: 'e8847ea985283735785e736b20c0ac34',
            language: 'en-US',
            query,
            page,
          },
        });
      } else {
        response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
          params: {
            api_key: 'e8847ea985283735785e736b20c0ac34',
            language: 'en-US',
            sort_by: 'popularity.desc',
            page,
          },
        });
      }
      setTvShows(prevTvShows => [...prevTvShows, ...response.data.results]);
      setHasMoreTvShows(response.data.page < response.data.total_pages);
    } catch (error) {
      console.error('Error fetching TV shows', error);
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
    fetchTvShows(1, searchTvTerm);
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
      fetchTvShows(tvPage + 1, searchTvTerm);
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
        {loading && !tvShows.length ? (
          <p className="celestial-note">Loading Serials...</p>
        ) : tvShows.length === 0 ? (
          <p className="celestial-note">No Serials found.</p>
        ) : (
          tvShows.map((show, index) => (
            <div key={index} className="star-card" onClick={() => openModal(show)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
              <div className="galaxy-info">
                <h3>{show.name}</h3>
              </div>
            </div>
          ))
        )}
        {hasMoreTvShows && !loading && (
          <button onClick={loadMoreTvShows} className="infinity-button">
            Load More Serials
          </button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="TV Show Details" className="nebula-window">
        {selectedItem && (
          <div className="nebula-core">
            <button className="portal-close" onClick={closeModal}>&times;</button>
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.overview}</p>
            <p><strong>First Air Date:</strong> {selectedItem.first_air_date}</p>
            {selectedItem.genre_ids && (
              <p><strong>Genres:</strong> {selectedItem.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SeriesPage;
