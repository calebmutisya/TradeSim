import React,{useState, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Navbar.css';
import logo from '../assets/Logo.svg'
import hamburgermenu from '../assets/menu.svg'
import xmark from '../assets/cross.svg'
import username from '../assets/username.svg'
import profimg from '../assets/profimg.png'
import email from '../assets/Message.svg'
import pass from '../assets/password.svg'
import { UserContext } from '../context/UserContext';

export default function Navbar() {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showCover, setShowCover] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { addUser, login, logout, currentUser,authToken } = useContext(UserContext);

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

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login function from UserContext
    login(loginUsername, loginPassword); // Pass username and password
    setShowCover(false);
  };

  const handleLogout = () => {
      // Implement logout function from UserContext
      logout();
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
        // Handle password mismatch
        console.error('Passwords do not match');
        return;
    }
    addUser(signupUsername, signupEmail, signupPassword);
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
        </div>
        <div className='links'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/markets">Markets</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/analysis">Analysis</NavLink>
          <NavLink to="/guide">Guide</NavLink>
        </div>
        <div className='btnsect'>
        {authToken ? (
          <>
            <div className='profcont'>
              <img className='loginimg' src={(currentUser && currentUser.profile_img) ? currentUser.profile_img : profimg}/>
              {currentUser && (
                    <p className='userslot'>{currentUser.username}</p>
                )}
              <div className='profilelink'>
                <p className='plinks'><NavLink to="/profile">Profile</NavLink></p>
              </div>
            </div>
            <button className="navbtn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
            <>
                <button className="navbtn" onClick={showSignup}>Login</button>
                <button className="navbtn" onClick={showSignup}>Sign Up</button>
            </>
          )}
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
            <form className='login3' onSubmit={handleLogin}>
              <div className='loginslot'>
                <img src={username}/>
                <input placeholder='Username' value={loginUsername} 
                onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div className='loginslot'>
                <img src={pass}/>
                <input placeholder='Password' type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
              </div>
              
              <button type="submit" className='accessbtn'>LOGIN</button>
              <p className='forgot' onClick={hideSignup}><NavLink to="/resetpassword">Forgot Password ?</NavLink></p>
            </form>
          ):(
            <form className='signup3' onSubmit={handleAddUser}>
              <div className='signupslot'>
                <img src={username}/>
                <input placeholder='Username'
                value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)}
                />
              </div>
              <div className='signupslot'>
                <img src={email}/>
                <input type="email" placeholder='Email' value={signupEmail} 
                onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className='signupslot'>
                <img src={pass}/>
                <input type="password" placeholder='Password' value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}/>
              </div>
              <div className='signupslot'>
                <img src={pass}/>
                <input type="password" placeholder='Confirm Password'
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className='accessbtn'>SIGNUP</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
