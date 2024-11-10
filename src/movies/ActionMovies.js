import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Color from '../components/ColorCircles'
let MovieCard = ({ movie, onClick }) => {
    
    let posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    return (<>

        <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={posterUrl} alt={movie.title} />
      <div className='head-text'> {movie.title}</div>

        </div>
        </>
    );
};

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

let MovieList = () => {
    let [movies, setMovies] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    let movieListRef = useRef(null);
    let navigate = useNavigate(); 

    useEffect(() => {
        let fetchMovies = async () => {
            try {
                let allMovies = [];
                let page = 1;
                let maxPages = 5;

                while (page <= maxPages) {
                    let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8847ea985283735785e736b20c0ac34&with_genres=28&language=en-US&page=${page}`);
                    let data = await response.json();
                    allMovies.push(...data.results);
                    page++;
                }

                setMovies(allMovies);
            } catch (error) {
                setError('Failed to fetch data');
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

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <span className='font'>Action Movies</span>
            <div className="movie-list-container">
                <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
                <div className="movie-list" ref={movieListRef}>
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
                    ))}
                </div>  
                <span className='button-scroll'>
                <button className="scroll-button right" onClick={scrollRight}>&gt;</button></span>
            </div>
            <Color/>
        </>
    );
};

export default MovieList;
