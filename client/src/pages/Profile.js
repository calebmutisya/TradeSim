import React,{useState, useContext, useEffect} from 'react'
import '../css/Profile.css';
import profimg from '../assets/profimg.png';
import Swal from 'sweetalert2'
import pencil from '../assets/pencil.svg';
import xmark from '../assets/cross.svg'
import { UserContext } from '../context/UserContext'
import { OpentradeContext } from '../context/OpentradeContext';
import ProfileImageUpload from '../components/FileUpload';

export default function Profile() {

  const { currentUser,authToken, updateUser, updateUserCapital } = useContext(UserContext);
  const { editPnltrade,deleteAllUserOpentrades,deleteAllUserClosedTrades } = useContext(OpentradeContext);
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

  const handleReset = async () => {
    try {
        // Reset the user's capital to 10,000
        await updateUserCapital(10000);
    } catch (error) {
        console.error('Error updating user capital:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update user capital. Continuing with trade deletions.',
        });
    }

    try {
        // Delete all open trades
        await deleteAllUserOpentrades();
    } catch (error) {
        console.error('Error deleting user open trades:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete user open trades. Continuing with closed trades deletion.',
        });
    }

    try {
        // Delete all closed trades
        await deleteAllUserClosedTrades();
    } catch (error) {
        console.error('Error deleting user closed trades:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete user closed trades. Please try again later.',
        });
    }

    Swal.fire({
        icon: 'success',
        title: 'Account Reset Successfully',
        text: 'Your capital has been reset to 10,000 and all trades have been deleted.',
    });
  };


  return (
    <div className='profcontainer'>
      <div className='alldetails'>
        <div className='imageslot'>
          <img className='image1' src={currentUser.profile_img || profimg}/>
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
      <div className='settingscont' onClick={handleReset}>
        <h3>Restart</h3>
        <p>Note that by restarting, capital balance<br/> will be reset to 10,000 and all progress deleted.</p>
        <button className='reset' type='submit'>RESET</button>
      </div>
      
    </div>
  )
}
