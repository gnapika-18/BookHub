import React from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
      const navigate = useNavigate()

  const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser') || 'null'
  )

  const handleLogout = () => {
  localStorage.removeItem('loggedInUser')

  navigate('/', { replace: true })
}
  return (
    <div> 
      <nav className="navbar">
        <h1 className="logo">Book Hub</h1>

        <div className="nav-links">
          <a href="/header">Dashboard</a>
          <a href="/home">Home</a>
          <a href="/books">Books</a>

          <span className="welcome-user">
            Hi, {loggedInUser?.fullName || 'Reader'}
          </span>
          <button
            type="button"
            onClick={handleLogout}
          >
          Logout
          </button>
        </div>
      </nav>
      
      <div className="section">
        <h1>Welcome to Book Hub</h1>
        <p className="hero-text">A place to discover your next favorite book.</p>
      </div>
    </div>
)
}
export default Header