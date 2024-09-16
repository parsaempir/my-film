import React, { useEffect, useState } from 'react';
import './new movies.css';

let MovieCard = ({ movie }) => {
    let posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    return (
        <div className="movie-cardq">
            <img src={posterUrl} alt={movie.title} className="movie-posterq" />
            <div className="movie-title-boxq">
                <h3>{movie.title}</h3>
            </div>
        </div>
    );
};

let LatestMovies = () => {
    let [movies, setMovies] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetchLatestMovies = async () => {
            try {
                let response = await fetch(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=e8847ea985283735785e736b20c0ac34&language=en-US&page=1`
                );
                let data = await response.json();
                setMovies(data.results.slice(0, 6)); 
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchLatestMovies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (<>
        <div className='head-of'>
            <h2 className='font'>Latest Movies</h2>
            <div className="movie-listq">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
        <hr/>
        
        </>
    );
};

export default LatestMovies;
