import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import MenuApp from './Menu';
import Serchi from '../assets/magnifying-glass-solid.svg'
import logos from '../assets/moviesland_transparent-parsa.png'
let Navbar = () => {
  let [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (<>
 
    <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='NavOnwer'>
   <div className='tv-navbar'>
 
   <Link to='/'><span><img src={logos} className='imgsf'></img></span></Link>
   <span className='link-tekn'>
        <Link to='/' className='linkof'>Home</Link>
        <Link to='movies' className='linkof'>All Movies</Link>
<Link to='series' className='linkof'>All Series</Link>
<Link to='allmovieseries' className='link-ser'><img src={Serchi} height='20px' className='serchig'></img></Link>
</span>

    </div>
  <MenuApp />
    </div>
    </nav>
    <div className='head'>
     <div className='vacant'></div>
     <div className='header'>
      <div className='below'>MUST-SEE MOVIES, NOW STREAMING <br/> </div>
      <span className='after'>Click on the button below to see and search for more movies and series</span>

       
    <span className='fine'>MoviesLand free trial available for new and eligible returning MoviesLand subscribers only. Cancel anytime. Additional terms<br/> </span>
    <span className='fine' id='fine-bac'>apply.</span>
    </div>
    </div>
 
  </>
  );
};

export default Navbar;
