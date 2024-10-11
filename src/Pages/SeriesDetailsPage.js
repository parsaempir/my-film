import React from 'react';
import { useLocation } from 'react-router-dom';

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
let SeriesDetailsPage = () => {
  let location = useLocation();
  let { show } = location.state || {};

  if (!show) {
    return <p>No details available.</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        {show.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name}  style={{ width: '300px' , borderRadius: '8px' }}  />  )}
      <h1 className='h1titel'>{show.name}</h1>
      <p className='ptitel'><strong>Release Date:</strong> {show.first_air_date}</p>
      <p className='ptitel'><strong>Genres:</strong> {show.genre_ids.map(id => genreMap[id]).join(', ')}</p>
      <p className='ptitel'> <strong>Overview:</strong>{show.overview}</p>
    
    </div>
  );
};

export default SeriesDetailsPage;
