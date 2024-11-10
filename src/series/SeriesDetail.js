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

let SeriesDetail = () => {
    let location = useLocation();
    let serie = location.state?.serie;
    const [cast, setCast] = useState([]);
    const [runtime, setRuntime] = useState(null); 
    const [userScore, setUserScore] = useState(null);

    useEffect(() => {
        if (serie?.id) {
            
            fetch(`https://api.themoviedb.org/3/tv/${serie.id}/credits?api_key=e8847ea985283735785e736b20c0ac34`)
                .then(response => response.json())
                .then(data => {
                    setCast(data.cast.slice(0, 5));
                })
                .catch(error => console.error("Error fetching series cast:", error));

            fetch(`https://api.themoviedb.org/3/tv/${serie.id}?api_key=e8847ea985283735785e736b20c0ac34`)
                .then(response => response.json())
                .then(data => {
                    setRuntime(data.episode_run_time[0]); 
                    setUserScore(data.vote_average ? `${data.vote_average * 10}%` : "N/A"); 
                })
                .catch(error => console.error("Error fetching series details:", error));
        }
    }, [serie]);

    if (!serie) {
        return <div>No series details available.</div>;
    }

    let getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).join(', ');
    };

    const posterUrl = serie.poster_path
        ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const backdropUrl = serie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${serie.backdrop_path}`
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
                    alt={serie.name}
                    style={{ width: '300px', height: '450px', borderRadius: '2px' }}
                />
                <div className="movie-details">
                    <h1 className='h1titel'>{serie.name || "Unknown Title"}</h1>
                    <h3 className='ptitel' id='ganer'><strong>Genres:</strong> {getGenres(serie.genre_ids)}</h3>
                    <br/>
                    <div className='textif'>
                        <span className='ptitel'><strong>Release Date:</strong> {serie.first_air_date}</span>
                        <span className='ptitel'><strong>User Score:</strong> {userScore}</span>
                        <span className='ptitel'>
                            <img src={timer} height='20px' alt="timer icon" /> {runtime ? `${runtime} min` : "N/A"}
                        </span>
                        </div>
                        <p className='ptitel' id='ower'><span className='separate'>Overview:</span> <br/> <span className='dim-color'>{serie.overview || "No overview available"}</span></p>
                   
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

export default SeriesDetail;
