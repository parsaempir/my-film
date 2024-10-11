import React from 'react';
import { useLocation } from 'react-router-dom';
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

let MovieDetail = () => {
    let location = useLocation();
    let movie = location.state?.movie;

    if (!movie) {
        return <div>No movie details available.</div>;
    }

    let getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).join(', ');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
      
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '300px', borderRadius: '8px'}}
            />
                  <h1 className='h1titel'>{movie.title || "Unknown Title"}</h1>
            <p className='ptitel'> <strong>Release Date:</strong> {movie.release_date}</p>
            <p className='ptitel'><strong>Genres:</strong> {getGenres(movie.genre_ids)}</p> { }
            <p className='ptitel'><strong>Overview:</strong>{movie.overview || "No overview available"}</p>
        </div>
    );
};

export default MovieDetail;
