import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Footer.css';
import logo from '../assets/Logo.svg'
import footimg from '../assets/footerimg.png'
import twitter from '../assets/twitter.svg'
import insta from '../assets/insta.svg'
import linkedin from '../assets/linkedin.svg'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='intouch'>
          <div>Get In Touch :</div>
          <div className='iconscont'>
            <a><img src={twitter}/></a>
            <a><img src={insta}/></a>
            <a><img src={linkedin}/></a>
          </div>
        </div>
        <div className='footdet'>
          <div className='footlinks'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/markets">Markets</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/analysis">Analysis</NavLink>
            <NavLink to="/guide">Guide</NavLink>
          </div>
          <div className='footlogo'><img src={logo}/>TRADESIM</div>
        </div>
    </div>
  )
}
