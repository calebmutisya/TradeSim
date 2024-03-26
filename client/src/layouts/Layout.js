import React from 'react'
import {Outlet} from 'react-router-dom'
import '../css/App.css';
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'

export default function Layout() {
  return (
    <div className='App'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
