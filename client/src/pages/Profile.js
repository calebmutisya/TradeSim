import React,{useState, useContext} from 'react'
import '../css/Profile.css';
import profimg from '../assets/profimg.png';
import pencil from '../assets/pencil.svg';
import xmark from '../assets/cross.svg'
import { UserContext } from '../context/UserContext'
import ProfileImageUpload from '../components/FileUpload';

export default function Profile() {

  const { currentUser,authToken } = useContext(UserContext);
  const [ showEditForm, setEditForm]= useState(false);

  const showForm=()=>{
    setEditForm(true);
  }

  const hideForm=()=>{
    setEditForm(false);
  }

  return (
    <div className='profcontainer'>
      <div className='alldetails'>
        <div className='imageslot'>
          <img className='image1' src={profimg}/>
          <div className='editcontainer'>
            <p>Username </p>
            <div className='userslot'>
              <img className='pencil' onClick={showForm} src={pencil} />
              <p className='tag1'>Edit Profile</p>
            </div>
          </div>
        </div>
        <div className='detailscont'>
          <p>Full Name: Lili Wackby</p>
          <p>Email: lili@gmail.com</p>
          <p>Capital: 10000</p>
        </div>
        <div className={ showEditForm ? 'editprofile visible':'editprofile'}>
          <img className='xmark' onClick={hideForm} src={xmark}/>
          <h3>Upload profile image</h3>
          <div className='upload'>
            <ProfileImageUpload/>
          </div>
          <form className='profileform'>
            <input placeholder='Firstname'/>
            <input placeholder='Lastname'/>
            <input type='email' placeholder='Email'/>
            <button className='save'>SAVE</button>
          </form>
        </div>
      </div>
      <div className='settingscont'>
        <h3>Restart</h3>
        <p>Note that by restarting, capital balance<br/> will be reset to 10,000 and all progress deleted.</p>
        <button className='reset'>RESET</button>
      </div>
      
    </div>
  )
}
