import React from "react";
import '../App.css';
import Ins from '../assets/instagram-brands-solid-parsaa.svg'
import Tel from '../assets/telegram-brands-solid-parsa.svg'
import logosf from '../assets/moviesland_transparent-parsa.png'
function TopNav(){
return(<>

<div className='OfPage'>
      <div className='totak'>

<div className='headtop'>To Contact The Site Coder:</div>
<div className="hitof"><img src={logosf} className="hit"></img></div>
<div className='lag'>
 <a href='https://www.instagram.com/parsa_empir?igsh=YnN0MW1qY3k0Y3Jx'> <img src={Ins} height='20px' ></img></a>
 <a href='https://t.me/parsa_empir'> <img src={Tel} height='20px' ></img></a>
 </div>
      </div>
    </div>

</>



)

}
export default TopNav;