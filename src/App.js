import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Homeee from './Homees'
import TheSecondPage from './page';
import Series from './Series page';
import AllMS from './All M S';

function App() {
  return ( <Router>
  <Navbar />
  
      <Routes>
      
        <Route path="/" element={<Homeee />} />
        <Route path="/page" element={<TheSecondPage />} />
        <Route path="/Series page" element={<Series />} />
        <Route path="/All M S" element={<AllMS />} />
      </Routes>

    </Router>
  
  );
}


export default App;
