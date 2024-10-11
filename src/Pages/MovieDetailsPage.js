import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
let MovieDetailsPage = () => {
  let { id } = useParams(); 
  let [movie, setMovie] = useState(null);
  let [genres, setGenres] = useState([]); 

  useEffect(() => {
    
    let fetchMovieDetails = async () => {
      try {
        let movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'e8847ea985283735785e736b20c0ac34',
            language: 'en-US',
          },
        });
        setMovie(movieResponse.data);
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    };

   
    let fetchGenres = async () => {
      try {
        let genreResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'e8847ea985283735785e736b20c0ac34',
            language: 'en-US',
          },
        });
        setGenres(genreResponse.data.genres);
      } catch (error) {
        console.error('Error fetching genres', error);
      }
    };

    fetchMovieDetails();
    fetchGenres();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  let genreNames = movie.genres.map((genre) => genre.name).join(', ');

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
     
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '300px' , borderRadius: '8px'}} 
        />
      )}
       <h1 className='h1titel'>{movie.title}</h1>
      <p className='ptitel'><strong>Release Date:</strong> {movie.release_date}</p>
      <p className='ptitel'><strong>Genres:</strong> {genreNames}</p>
      <p className='ptitel'> <strong>Overview:</strong> {movie.overview}</p>
    </div>
  );
};

export default MovieDetailsPage;
