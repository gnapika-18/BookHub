
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'

const Home = () => {
  const navigate = useNavigate()

  const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser') || 'null'
  )

  const handleLogout = () => {
  localStorage.removeItem('loggedInUser')

  navigate('/', { replace: true })
}

const books = [
  {
    id: 1,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    image: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
    description: 'A journey of following your dreams.'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    image: 'https://covers.openlibrary.org/b/id/12547191-L.jpg',
    description: 'Learn how small habits create big changes.'
  },
  {
    id: 3,
    title: 'Wings of Fire',
    author: 'A.P.J. Abdul Kalam',
    image: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
    description: 'An inspiring autobiography.'
  }
]

  return (
    <div className="home-container">

      
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

      <section className="hero-section">
        <h1>Discover Your Next Favourite Book</h1>
        <p>
          Explore amazing books and find your next reading adventure.
        </p>
        <div className="books-section" id="books">
               <h2>Popular Books</h2>
        <div className="books-container">
    {books.map((book) => (
      <div className="book-card" key={book.id}>
        <img src={book.image} alt={book.title} />

        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p>{book.description}</p>
      </div>
    ))}
  </div>
        </div>
      </section>
    </div>
  )
}

export default Home
