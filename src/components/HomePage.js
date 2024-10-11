import React from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../movies/action';
import LatestMovies from './new movis'
import DramaMovies from '../movies/deram'
import Appfun from '../series/Romance Series'
import AppSun from '../series/Drama Series'
import Top from './top nav';
function Home() {
  return (
  <>
           <div className="App">
   
<h1 className='line'>Movies</h1>
<LatestMovies />
<div className='head-sun'>
<MovieList /> 
<DramaMovies />
<Appfun />
<AppSun />
</div>
    </div> 
       <div className='bot-top'>
      <Link to='/AllMovieSeries'><button className='btntop'>View More</button></Link>
    </div>

    <Top />
    </>
  );
}

export default Home;
