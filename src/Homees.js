import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import MovieList from './action';
import LatestMovies from './new movis'
import DramaMovies from './deram'
import Appfun from './Romance Series'
import AppSun from './Drama Series'
import Top from './top nav';
function Homeee() {
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
      <Link to='/All M S'><button className='btntop'>View More</button></Link>
    </div>

    <Top />
    </>
  );
}

export default Homeee;
