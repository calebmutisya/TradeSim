import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Footer.css';
import logo from '../assets/Logo.svg'
import footimg from '../assets/footerimg.png'
import twitter from '../assets/twitter.svg'
import insta from '../assets/insta.svg'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='intouch'>
          <div>Get In Touch :</div>
          <div className='iconscont'>
            <a href='https://x.com/MutisyaCal59031' target="_blank"><img src={twitter}/></a>
            <a href='https://github.com/calebmutisya/TradeSim' target="_blank"><img src={github}/></a>
            <a href='https://www.linkedin.com/in/caleb-mutisya-302037290/' target="_blank"><img src={linkedin}/></a>
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
