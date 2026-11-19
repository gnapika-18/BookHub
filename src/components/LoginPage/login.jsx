
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [apiError, setApiError] = useState('')

  const onSubmitForm = (event) => {
    event.preventDefault()

    setUsernameError('')
    setPasswordError('')
    setApiError('')

    let isValid = true

    if (username.trim() === '') {
      setUsernameError('Username is required')
      isValid = false
    }

    if (password.trim() === '') {
      setPasswordError('Password is required')
      isValid = false
    }

    if (!isValid) return

    const existingUsers = JSON.parse(
      localStorage.getItem('bookhubUsers') || '[]'
    )

    const loggedInUser = existingUsers.find(
      (user) =>
        user.username.toLowerCase() === username.trim().toLowerCase()
    )

    if (!loggedInUser) {
      setApiError('Username does not exist')
      return
    }

    if (loggedInUser.password !== password) {
      setApiError('Incorrect password')
      return
    }

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        fullName: loggedInUser.fullName,
        username: loggedInUser.username,
        email: loggedInUser.email,
      })
    )

    setUsername('')
    setPassword('')

    navigate('/header', { replace: true })
  }

  return (
    <div className="login-container">
      <div className="login-image">
        <img
          src="https://i.pinimg.com/736x/ec/eb/96/eceb96d518abee94e14367447993f92a.jpg"
          alt="Book Hub login"
        />
      </div>

      <form className="login-form" onSubmit={onSubmitForm}>
        <h1>Book Hub</h1>

        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />

        {usernameError && (
          <p className="error-message">{usernameError}</p>
        )}

        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />

        {passwordError && (
          <p className="error-message">{passwordError}</p>
        )}

        <button type="submit">Login</button>

        {apiError && (
          <p className="error-message">{apiError}</p>
        )}

        <div className="login-link">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
