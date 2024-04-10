import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Navbar.css';
import logo from '../assets/Logo.svg'
import hamburgermenu from '../assets/menu.svg'
import xmark from '../assets/cross.svg'

export default function Navbar() {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showCover, setShowCover] = useState(false)

  const showSignup=()=> {
    setShowCover(true);
  }

  const hideSignup=()=>{
    setShowCover(false);
  }

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const showSidebar = () => {
    setSidebarVisible(true);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div>
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
          <button className='navbtn' onClick={showSignup}>Login</button>
          <button className='navbtn' onClick={showSignup}>Sign Up</button>
        </div>
      </nav>
      <div className={showCover ? 'cover visible' : 'cover'}>
        <div className='loginbox'>
          <img className='xicon' onClick={hideSignup} src={xmark}/>
          <div className='togglebtn'>
            <div onClick={toggleForm}>Login</div>
            <div onClick={toggleForm}>SignUp</div>
          </div>
          {showLogin ? (
            <form className='login3'>
              <input className='slot3' placeholder='username'/>
              <input className='slot3' placeholder='password' type="password"/>
              <button className='accessbtn'>Login</button>
            </form>
          ):(
            <form className='signup3'>
              <input className='slot' placeholder='username'/>
              <input className='slot' placeholder='email'/>
              <input className='slot' placeholder='password' type="password"/>
              <input className='slot' placeholder='confirm password' type="password"/>
              <button className='accessbtn'>SignUp</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
