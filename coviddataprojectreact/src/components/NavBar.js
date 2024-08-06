import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


const NavBar = () => {
  return (
    <>
      <nav className='navBar'>
        <ul className='navBarUl'>
            <li className='navBarUlLi'><Link className='navBarUlLiLink' to="/">Home</Link></li>
            <li className='navBarUlLi'><Link className='navBarUlLiLink' to="/statewise">StateWise</Link></li>
            <li className='navBarUlLi'><Link className='navBarUlLiLink' to="/daywisecoviddoses">DayWiseData</Link></li>
            <li className='navBarUlLi'><Link className='navBarUlLiLink' to="/covid">CovidAffect</Link></li>
            <li className='navBarUlLi'><Link className='navBarUlLiLink' to="/covidvaccine">CovidVaccine</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar
