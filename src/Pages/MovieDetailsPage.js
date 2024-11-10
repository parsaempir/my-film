import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import timer from '../assets/hourglass-half-regular.svg';

const MovieDetailsPage = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);  
    const [runtime, setRuntime] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: 'e8847ea985283735785e736b20c0ac34',
                        language: 'en-US',
                    },
                });
                setMovie(movieResponse.data);
                setRuntime(movieResponse.data.runtime);
            } catch (error) {
                console.error('Error fetching movie details', error);
            }
        };

        const fetchCast = async () => {
            try {
                const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                    params: {
                        api_key: 'e8847ea985283735785e736b20c0ac34',
                    },
                });
                setCast(castResponse.data.cast.slice(0, 5));
            } catch (error) {
                console.error('Error fetching movie cast', error);
            }
        };

        fetchMovieDetails();
        fetchCast();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    const getGenres = (genres) => {
        if (!Array.isArray(genres) || genres.length === 0) return "N/A";
        return genres
            .map(genre => genre.name)
            .join(', ') || "N/A";
    };

    const formatRuntime = (minutes) => {
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
                    <h1 className='h1titel'>{movie.title || "Unknown Title"} <br /> ({new Date(movie.release_date).getFullYear()})</h1>
                    <h3 className='ptitel' id='ganer'><strong>Genres:</strong> {getGenres(movie.genres)}</h3>
                    <div className='textif'>
                        <span className='ptitel'><strong>Release Date:</strong> {movie.release_date}</span>
                        <span className='ptitel'><strong>User Score:</strong> {movie.vote_average ? `${movie.vote_average * 10}%` : "N/A"}</span>
                        <span className='ptitel'>
                            <img src={timer} height='20px' alt="timer icon" /> {formatRuntime(runtime)}
                        </span>
                    </div>
                    <p className='ptitel' id='ower'><span className='separate'>Overview:</span><br /> <span className='dim-color'>{movie.overview || "No overview available"}</span></p>

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

export default MovieDetailsPage;
