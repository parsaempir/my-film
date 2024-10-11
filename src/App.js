import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage'
import TheSecondPage from './Pages/page';
import Series from './Pages/Series page';
import AllMovieSeriesPage from './components/AllMovieSeries';
import MovieDetail from './movies/MovieDetail';
import SeriesDetail from './series/SeriesDetail';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import SeriesDetailsPage from './Pages/SeriesDetailsPage';
import DetailsPage from './Pages/DetailsPage';


function App() {
  return ( <Router>
  <Navbar/>
  
      <Routes>
      
        <Route path="/" element={<Home/>}/>
        <Route path="/page" element={<TheSecondPage/>}/>
        <Route path="/Series page" element={<Series/>}/>
        <Route path="/AllMovieSeries" element={<AllMovieSeriesPage/>}/>
        <Route path="/movie/:id" element={<MovieDetail/>} />
        <Route path="/series/:id" element={<SeriesDetail/>} />
        <Route path="/movies/:id" element={<MovieDetailsPage/>} />
        <Route path="/series-details" element={<SeriesDetailsPage/>} />
        <Route path="/details" element={<DetailsPage/>} />

      </Routes>

    </Router>
  
  );
}


export default App;
