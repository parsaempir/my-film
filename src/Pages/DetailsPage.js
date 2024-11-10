import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import timer from '../assets/hourglass-half-regular.svg';
import '../App.css';

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

const DetailsPage = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const [cast, setCast] = useState([]);
  const [runtime, setRuntime] = useState(null);

  useEffect(() => {
    if (item) {
      const fetchAdditionalDetails = async () => {
        try {
          const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}`, {
            params: {
              api_key: 'e8847ea985283735785e736b20c0ac34',
              language: 'en-US',
            },
          });
          setRuntime(movieResponse.data.runtime);

          const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits`, {
            params: {
              api_key: 'e8847ea985283735785e736b20c0ac34',
            },
          });
          setCast(castResponse.data.cast.slice(0, 5));
        } catch (error) {
          console.error('Error fetching additional movie details', error);
        }
      };
      fetchAdditionalDetails();
    }
  }, [item]);

  if (!item) {
    return <p>No details available.</p>;
  }

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  };

  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  const backdropUrl = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : posterUrl;

  return (
    <div className="movie-detail-page">
      <div
        className="movie-background"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          position: 'absolute',
          width: '100%',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          opacity: 0.6,
        }}
      ></div>

      <div style={{ position: 'relative', zIndex: 1 }} className="movie-section">
        <img className="img-movie"
          src={posterUrl}
          alt={item.title || item.name}
          style={{ width: '300px', height: '450px', borderRadius: '8px' }}
        />
        
        <div className="movie-details">
          <h1 className="h1titel">{item.title || item.name} <br /> ({new Date(item.release_date).getFullYear()})</h1>
          
          <h3 className="ptitel" id="ganer">
            <strong>Genres:</strong> {item.genre_ids.map(id => genreMap[id]).join(', ') || "N/A"}
          </h3>

          <div className="textif">
            <span className="ptitel"><strong>Release Date:</strong> {item.release_date || item.first_air_date}</span>
            <span className="ptitel"><strong>User Score:</strong> {item.vote_average ? `${item.vote_average * 10}%` : "N/A"}</span>
            <span className="ptitel">
              <img src={timer} height="20px" alt="timer icon" /> {formatRuntime(runtime)}
            </span>
          </div>
          
          <p className="ptitel" id="ower">
            <span className="separate">Overview:</span><br /> 
            <span className="dim-color">{item.overview || "No overview available"}</span>
          </p>

          <div className="movie-cast">
            <h3 className="ptitel"><strong>Cast:</strong></h3>
            <div className="cast-list">
              {cast.map(actor => (
                <div key={actor.id} className="cast-member">
                  {actor.profile_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="cast-image"
                    />
                  ) : (
                    <div className="cast-image no-image">No Image</div>
                  )}
                  <p className="cast-name">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
