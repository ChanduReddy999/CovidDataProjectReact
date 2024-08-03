import React from 'react'
import { Link } from 'react-router-dom'
import './notFoundPage.css'

function NotFoundPage() {
  return (
    <>
      <div className='divNotFoundPage'>
        <Link className='linksToHomePage' to="/">CovidHomePage</Link>
      </div>
    </>
  )
}

export default NotFoundPage
