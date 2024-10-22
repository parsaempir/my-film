
import React, { useEffect, useState, useRef } from 'react';
import './RomanceSeries.css';
import { useNavigate } from 'react-router-dom';  

let genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

let AppSun = () => {
  let [series, setSeries] = useState([]);
  let [loading, setLoading] = useState(true); 
  let [error, setError] = useState(null); 
  let seriesWrapperRef = useRef(null);
  let navigate = useNavigate(); 

  let fetchDramaSeries = async () => {
    let apiKey = 'e8847ea985283735785e736b20c0ac34'; 
    try {
      let response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=18&language=en-US&page=1`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      if (data.results && data.results.length > 0) {
        setSeries(data.results); 
      } else {
        setSeries([]); 
      }
    } catch (error) {
      setError('Failed to load drama series.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDramaSeries();
  }, []);

  let scroll = (direction) => {
    if (seriesWrapperRef.current) {
      let scrollAmount = 300; 
      seriesWrapperRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  let handleCardClick = (serie) => {
    navigate(`/series/${serie.id}`, { state: { serie } }); 
  };

  return (
    <>
      <h2 className='fonts1'>Drama Series</h2>
      <div className="container">
        <div className="scroll-container">
          <button className="scroll-button left" onClick={() => scroll('left')}>&lt;</button>
          <div className="series-wrapper" ref={seriesWrapperRef}>
            {loading && <p>Loading series...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && series.length > 0 && (
              <ul className="series-list">
                {series.map((serie) => (
                  <li key={serie.id} onClick={() => handleCardClick(serie)}>
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} 
                      alt={serie.name} 
                      onError={(e) => e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'} 
                    />
                    <h2 className='textfx'>{serie.name}</h2>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="scroll-button right" onClick={() => scroll('right')}>&gt;</button>
        </div>
      </div>
    </>
  );
};

export default AppSun;
