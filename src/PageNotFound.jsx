
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Notfound.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>

      <p>
        The page you are looking for doesn't exist
        or may have been moved.
      </p>

      <button onClick={() => navigate('/')}>
        Go to Login
      </button>
    </div>
  )
}

export default NotFound
