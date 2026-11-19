
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './register.css'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
const validateForm = () => {
  const newErrors = {};

  if (!fullName.trim()) {
    newErrors.fullName = "Full name is required";
  }

  if (!username.trim()) {
    newErrors.username = "Username is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleRegister = (e) => {
  e.preventDefault();

  setSuccess('');

  if (!validateForm()) {
    return;
  }

  // Get existing users from localStorage
  const existingUsers = JSON.parse(
    localStorage.getItem('bookhubUsers') || '[]'
  );

  // Check duplicate username
  const usernameExists = existingUsers.some(
    user => user.username.toLowerCase() === username.trim().toLowerCase()
  );

  // Check duplicate email
  const emailExists = existingUsers.some(
    user => user.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (usernameExists || emailExists) {
    setErrors({
      username: usernameExists ? 'Username already exists' : '',
      email: emailExists ? 'Email already registered' : ''
    });
    return;
  }

  // Create new user object
  const newUser = {
    fullName,
    username: username.trim(),
    email: email.trim(),
    password
  };

  // Save user
  existingUsers.push(newUser);

  localStorage.setItem(
    'bookhubUsers',
    JSON.stringify(existingUsers)
  );

  setSuccess('Account created successfully!');

  // Clear form fields
  setFullName('');
  setUsername('');
  setEmail('');
  setPassword('');
  setConfirmPassword('');
  setErrors({});
};

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleRegister}>
        <h1>Book Hub</h1>
        <h2>Create Account</h2>

        <label>FULL NAME</label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Enter full name"
        />

        <label>USERNAME</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <label>EMAIL</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <label>PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <label>CONFIRM PASSWORD</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        <button type="submit">Create Account</button>
        {success && <p className="success-message">{success}</p>}
        <div className="login-link">
           <p>
            Already have an account? <Link to="/">Login</Link>
           </p>
        </div>
      </form>
    </div>
  )
}

export default Register
