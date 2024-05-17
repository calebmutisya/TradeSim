import React,{useState, useContext} from 'react'
import '../css/Reset.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { OpentradeContext } from '../context/OpentradeContext';

export default function ResetPassword() {
  return (
    <div className='resetcont'>
        <h2>Reset Password</h2>
        <form className='resetform'>
            <input type='text' placeholder='Username'/>
            <input type='email' placeholder='Email'/>
            <input type='password' placeholder='New Password'/>
            <button className='resetbtn'>SUBMIT</button>
        </form>
        <p>Insert corrrect username and email to change your password.</p>
    </div>
  )
}
