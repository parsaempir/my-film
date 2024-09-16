import React, { useEffect, useState, useRef } from 'react';
import './App.css';



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
    let [selectedMovie, setSelectedMovie] = useState(null);

    let movieListRef = useRef(null); 

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
        setSelectedMovie(movie);
    };

    let closeModal = () => {
        setSelectedMovie(null);
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

    let getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).join(', ');
    };

    return (<>
        <h2 className='fonts'>Action Movies</h2>
        <div className="movie-list-container">
        
            <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
            <div className="movie-list" ref={movieListRef}>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
                ))}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>&gt;</button>

            {selectedMovie && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedMovie.title}</h2>
                        <p ><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
                        <p><strong>Genres:</strong> {getGenres(selectedMovie.genre_ids)}</p>
                    </div>
                </div>
            )}
        </div></>
    );
};
export default MovieList;