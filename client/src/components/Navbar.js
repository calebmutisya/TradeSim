import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/markets">Markets</NavLink>
      <NavLink to="/news">News</NavLink>
      <NavLink to="/analysis">Analysis</NavLink>
      <NavLink to="/guide">Guide</NavLink>
      <NavLink to="/about">About Us</NavLink>
    </nav>
  )
}
