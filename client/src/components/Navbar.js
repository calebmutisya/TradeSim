import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Navbar.css';
import logo from '../assets/Logo.svg'
import hamburgermenu from '../assets/menu.svg'
import xmark from '../assets/cross.svg'

export default function Navbar() {

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const showSidebar = () => {
    setSidebarVisible(true);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <nav>
      <div className='logo'>
        <img src={hamburgermenu} onClick={showSidebar} className='menuicon'/>
        <img className='tlogo' src={logo}/>TRADESIM
      </div>
      <div className={sidebarVisible ? 'ulinks visible' : 'ulinks'}>
        <img className='xicon' onClick={hideSidebar} src={xmark}/>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/markets">Markets</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/analysis">Analysis</NavLink>
        <NavLink to="/guide">Guide</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </div>
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
