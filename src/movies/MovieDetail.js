import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import timer from '../assets/hourglass-half-regular.svg';

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
    const [runtime, setRuntime] = useState(null);
    const [cast, setCast] = useState([]);  

    useEffect(() => {
        if (movie?.id) {
          
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=e8847ea985283735785e736b20c0ac34`)
                .then(response => response.json())
                .then(data => {
                    setRuntime(data.runtime);
                })
                .catch(error => console.error("Error fetching movie details:", error));

            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=e8847ea985283735785e736b20c0ac34`)
                .then(response => response.json())
                .then(data => {
                    setCast(data.cast.slice(0, 5));
                })
                .catch(error => console.error("Error fetching movie cast:", error));
        }
    }, [movie]);

    useEffect(() => {
        let handleScroll = () => {
            let background = document.querySelector('.movie-background');
            let scrollPosition = window.scrollY;
            background.style.transform = `translateY(${scrollPosition * 0}px)`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!movie) {
        return <div>No movie details available.</div>;
    }

    let getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).join(', ');
    };

    let formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
    };

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : posterUrl;

    return (
        <div className="movie-detail-page">
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
                <img className='img-movie'
                    src={posterUrl}
                    alt={movie.title}
                    style={{ width: '300px', height: '500px', borderRadius: '2px' }}
                />
                <div className="movie-details">
                    <h1 className='h1titel'>{movie.title || "Unknown Title"} <br></br> ({new Date(movie.release_date).getFullYear()}) </h1>
                    <h3 className='ptitel' id='ganer'><strong>Genres:</strong> {getGenres(movie.genre_ids)}</h3>
                    <br/>
                    <div className='textif'>
                        <span className='ptitel'><strong>Release Date:</strong> {movie.release_date}</span>
                        <span className='ptitel'><strong>User Score:</strong> {movie.vote_average ? `${movie.vote_average * 10}%` : "N/A"}</span>
                        <span className='ptitel'>
                            <img src={timer} height='20px' alt="timer icon" />  {formatRuntime(runtime)}
                        </span>
                    </div> 
                    <br/>
                    <p className='ptitel' id='ower'><span className='separate'>Overview:</span><br/> <span className='dim-color'>{movie.overview || "No overview available"}</span></p>

                    {}
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

export default MovieDetail;
