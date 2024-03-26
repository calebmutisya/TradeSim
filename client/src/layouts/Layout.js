import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'


export default function Layout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
