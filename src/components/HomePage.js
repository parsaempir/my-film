import React from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../movies/Action';
import LatestMovies from './NewMovies'
import DramaMovies from '../movies/Deram'
import Appfun from '../series/RomanceSeries'
import AppSun from '../series/DramaSeries'
import Top from './TopNav';
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
      <Link to='/allmovieseries'><button className='btntop'>View More</button></Link>
    </div>

    <Top />
    </>
  );
}

export default Home;
