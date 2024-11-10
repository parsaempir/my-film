import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import timer from '../assets/hourglass-half-regular.svg'; // آیکون ساعت شنی

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

const SeriesDetailsPage = () => {
  let location = useLocation();
  let { show } = location.state || {};
  const [cast, setCast] = useState([]);
  const [episodeRuntime, setEpisodeRuntime] = useState(null);

  useEffect(() => {
    if (show?.id) {
      fetch(`https://api.themoviedb.org/3/tv/${show.id}/credits?api_key=e8847ea985283735785e736b20c0ac34`)
        .then(response => response.json())
        .then(data => {
          setCast(data.cast.slice(0, 5)); 
        })
        .catch(error => console.error("Error fetching cast details:", error));

      fetch(`https://api.themoviedb.org/3/tv/${show.id}/episodes?api_key=e8847ea985283735785e736b20c0ac34`)
        .then(response => response.json())
        .then(data => {
          const totalRuntime = data.episodes.reduce((acc, episode) => acc + (episode.runtime || 0), 0);
          setEpisodeRuntime(totalRuntime);
        })
        .catch(error => console.error("Error fetching episode details:", error));
    }
  }, [show]);

  if (!show) {
    return <p>No details available.</p>;
  }

  const getGenres = (genreIds) => {
    return genreIds.map(id => genreMap[id]).join(', ');
  };

  const formatRuntime = (minutes) => {
    if (!minutes || minutes === 0) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  };

  const posterUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const backdropUrl = show.backdrop_path
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : posterUrl;

  return (
    <div className="series-detail-page">
      <div
        className="movie-background"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          position: 'absolute',
          width: '100%',
          height: '1250px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          opacity: 0.6
        }}
      ></div>

      <div style={{ position: 'relative', zIndex: 1 }} className='movie-section'>
        <img
          src={posterUrl}
          alt={show.name}
          style={{ width: '300px', height: '500px', borderRadius: '2px' }}
        />
        <div className="movie-details">
          <h1 className='h1titel'>{show.name || "Unknown Title"} <br /> ({new Date(show.first_air_date).getFullYear()})</h1>
          <h3 className='ptitel' id='ganer'><strong>Genres:</strong> {getGenres(show.genre_ids)}</h3>
          <br />
          <div className='textif'>
            <span className='ptitel'><strong>Release Date:</strong> {show.first_air_date}</span>
            <span className='ptitel'><strong>User Score:</strong> {show.vote_average ? `${show.vote_average * 10}%` : "N/A"}</span>
            <span className='ptitel'>
              <img src={timer} height='20px' alt="timer icon" />  {formatRuntime(episodeRuntime)}
            </span>
          </div>
          <br />
          <p className='ptitel' id='ower'><span className='separate'>Overview:</span><br /> <span className='dim-color'>{show.overview || "No overview available"}</span></p>

          <div className="movie-cast">
            <h3 className='ptitel'><strong>Cast:</strong></h3>
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

export default SeriesDetailsPage;
