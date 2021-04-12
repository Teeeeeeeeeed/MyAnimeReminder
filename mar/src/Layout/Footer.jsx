import React from 'react';
import '../App.css'
import image from '../img/Githublogo.png'
import mail from '../img/Mail.png';
import linkedin from '../img/Linkdin.png'


const Footer = () => (
    <footer class='footer'>
        <div className='container'>
            <h3 className='row justify-content-center text'>My Anime Reminder</h3>
            <h4 className='row justify-content-center text'> Get in contact</h4>
            <div className='logos'>
                <a href='https://github.com/Teeeeeeeeeed'><img src={image} className='logo'/></a>
                <a href='mailto:ted.te.lo@hotmail.com?Subject=My Anime Reminder'><img src={mail} className='logo'/></a>
                <a href='https://www.linkedin.com/in/ted-lo-802a54a5/'><img src={linkedin} className='logo'/></a>
            </div>
            <hr></hr>
            <div className='row'>
                <p className='row justify-content-center text'>
                    &copy;{new Date().getFullYear()} | All rights reserved | Terms of Service | Privacy
                </p>
            </div>
        </div>
    </footer>
)

export default Footer;