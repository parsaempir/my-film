import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom'; 

let MovieCard = ({ movie, onClick }) => {
    let posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <img src={posterUrl} alt={movie.title} />
            <h3 className='titel-await'>{movie.title}</h3>
        </div>
    );
};

let DramaMovies = () => {
    let [movies, setMovies] = useState([]);
    let [loading, setLoading] = useState(true);

    let movieListRef = useRef(null);
    let navigate = useNavigate(); 

    useEffect(() => {
        let fetchMovies = async () => {
            try {
                let allMovies = [];
                let page = 1;
                let maxPages = 5;

                while (page <= maxPages) {
                    let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8847ea985283735785e736b20c0ac34&with_genres=18&language=en-US&page=${page}`);
                    let data = await response.json();
                    allMovies.push(...data.results);
                    page++;
                }

                setMovies(allMovies);
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    let handleCardClick = (movie) => {
        navigate(`/movie/${movie.id}`, { state: { movie } }); 
    };

    let scrollLeft = () => {
        if (movieListRef.current) {
            movieListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    let scrollRight = () => {
        if (movieListRef.current) {
            movieListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2 className='fonts'>Drama Movies</h2>
            <div className="movie-list-container">
                <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
                <div className="movie-list" ref={movieListRef}>
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
                    ))}
                </div>
                <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
            </div>
        </>
    );
};

export default DramaMovies;
