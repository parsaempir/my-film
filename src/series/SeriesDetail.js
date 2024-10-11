
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

let SeriesDetail = () => {
  let location = useLocation();
  let serie = location.state?.serie;

  if (!serie) {
    return <div>No series details available.</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      
      <img
        src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
        alt={serie.name}
        style={{ width: '300px', borderRadius: '8px'}}
      />
      <h1 className='ptitel'>{serie.name || "Unknown Title"}</h1>
      <p className='ptitel'><strong>Release Date:</strong> {serie.first_air_date}</p>
      <p className='ptitel'><strong>Genres:</strong> {serie.genre_ids.map(id => genreMap[id]).join(', ')}</p>
      <p className='ptitel'> <strong>Overview:</strong>{serie.overview || "No overview available"}</p>
    </div>
  );
};

export default SeriesDetail;
