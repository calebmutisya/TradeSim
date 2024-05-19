import React,{useState, useContext, useEffect} from 'react'
import '../css/Profile.css';
import profimg from '../assets/profimg.png';
import pencil from '../assets/pencil.svg';
import xmark from '../assets/cross.svg'
import { UserContext } from '../context/UserContext'
import ProfileImageUpload from '../components/FileUpload';

export default function Profile() {

  const { currentUser,authToken, updateUser } = useContext(UserContext);
  const [ showEditForm, setEditForm]= useState(false);
  const [firstname, setFirstName] = useState(currentUser?.firstname || '');
  const [lastname, setLastName] = useState(currentUser?.lastname || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  useEffect(() => {
    if (currentUser) {
        setFirstName(currentUser.firstname || '');
        setLastName(currentUser.lastname || '');
        setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const showForm=()=>{
    setEditForm(true);
  }

  const hideForm=()=>{
    setEditForm(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      firstname,
      lastname,
      email,
    };
    updateUser(updatedData);
    hideForm();
  };

  return (
    <div className='profcontainer'>
      <div className='alldetails'>
        <div className='imageslot'>
          <img className='image1' src={profimg}/>
          <div className='editcontainer'>
            <p>{currentUser.username}</p>
            <div className='userslot'>
              <img className='pencil' onClick={showForm} src={pencil} />
              <p className='tag1'>Edit Profile</p>
            </div>
          </div>
        </div>
        <div className='detailscont'>
          <p>Full Name: {currentUser?.firstname} {currentUser?.lastname}</p>
          <p>Email: {currentUser?.email}</p>
          <p>Capital: {currentUser?.capital}</p>
        </div>
        <div className={ showEditForm ? 'editprofile visible':'editprofile'}>
          <img className='xmark' onClick={hideForm} src={xmark}/>
          <h3>Upload profile image</h3>
          <div className='upload'>
            <ProfileImageUpload/>
          </div>
          <form className='profileform' onSubmit={handleSubmit}>
            <input placeholder='Firstname' value={firstname}
              onChange={(e) => setFirstName(e.target.value)}/>
            <input placeholder='Lastname' value={lastname}
              onChange={(e) => setLastName(e.target.value)}/>
            <input type='email' placeholder='Email' value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            <button className='save' type='submit'>SAVE</button>
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
