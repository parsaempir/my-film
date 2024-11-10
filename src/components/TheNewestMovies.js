import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './TheNewestMovies.css';
import Color from './ColorCircles'
import '../App.css'
let LatestMovies = () => {
    let [movies, setMovies] = useState([]);
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate(); 

    useEffect(() => {
        let fetchLatestMovies = async () => {
            try {
                let response = await fetch(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=e8847ea985283735785e736b20c0ac34&language=en-US&page=1`
                );
                let data = await response.json();
                setMovies(data.results.slice(0, 4)); 
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchLatestMovies();
    }, []);

    let handleMovieClick = (movie) => {
        navigate(`/movies/${movie.id}`, { state: { movie } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='head-of'>
                <span className='font'>Latest Movies</span>
                <div className="movie-listq">
                    {movies.map((movie) => {
                        let posterUrl = movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : 'https://via.placeholder.com/200x300?text=No+Image';

                        return (
                            <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                                                                   

                                <img src={posterUrl} alt={movie.title} className="movie-posterq" />
                                <div className='head-text'>{movie.title}</div>
                              
                            </div>
                        );
                    })}
                </div>
            </div>
          <Color/>
        </>
    );
};

export default LatestMovies;
