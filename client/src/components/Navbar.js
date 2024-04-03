import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Navbar.css';
import logo from '../assets/Logo.svg'
export default function Navbar() {
  return (
    <nav>
      <div className='logo'><img src={logo}/>TRADESIM</div>
      <div className='links'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/markets">Markets</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/analysis">Analysis</NavLink>
        <NavLink to="/guide">Guide</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </div>
      <div className='btnsect'>
        <button className='navbtn'>Login</button>
        <button className='navbtn'>Sign Up</button>
      </div>
    </nav>
  )
}
