import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './menu.css';
import logoof from '../assets/bars.svg'
import { Link } from 'react-router-dom';
import Serchi from '../assets/magnifying-glass-solid.svg'
Modal.setAppElement('#root');

function MenuApp() {
    let [isWiggleBoxOpen, setIsWiggleBoxOpen] = useState(false);
    let [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

    let openWiggleBox = () => setIsWiggleBoxOpen(true);
    let closeWiggleBox = () => setIsWiggleBoxOpen(false);

    let handleResize = () => {
        let isMobileView = window.innerWidth <= 768;
        setIsMobile(isMobileView);
        if (!isMobileView && isWiggleBoxOpen) {
            closeWiggleBox(); 
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize); 
        };
    }, [isWiggleBoxOpen]);

    return (<>
    <div className='btn-headof'>
        <div className="GigglyContainer">
            {isMobile && ( 
                <button className="funky-logo-button" onClick={openWiggleBox}>
                    <img src={logoof} height='30px'></img>
                </button>
            )}</div>
            <Modal
                isOpen={isWiggleBoxOpen}
                onRequestClose={closeWiggleBox}
                className={`wobble-modal ${isWiggleBoxOpen ? 'wobble-modal-open' : ''}`}
                overlayClassName="funky-overlay"
            >
                <button onClick={closeWiggleBox} className="wonky-close-button">×</button>
                <div className='link-gap'>
                <Link to='/' className='linkof'>Home</Link>
                <Link to='movies' className='linkof'>All Movies</Link>
                <Link to='series' className='linkof'>All Series</Link>
                <Link to='allmovieseries'> <img src={Serchi} height='20px'></img></Link>
                </div>
            </Modal>
        </div></>
    );
}

export default MenuApp;
