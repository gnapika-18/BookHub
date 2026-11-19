
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './books.css'
import { booksList, bookshelvesList } from './booksData'

const Books = () => {
  const navigate = useNavigate()

  const [booksWithCovers, setBooksWithCovers] = useState(
    booksList.map((book) => ({ ...book, coverPic: '' }))
  )

  const [activeFilter, setActiveFilter] = useState('All')
  const [activeShelf, setActiveShelf] = useState('ALL')
  const [readBooks, setReadBooks] = useState([])
  const [ongoingBooks, setOngoingBooks] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')

 
useEffect(() => {
  let isMounted = true

  const fetchBookCovers = async () => {
    const updatedBooks = await Promise.all(
      booksList.map(async (book) => {
        try {
          const query = encodeURIComponent(
            `intitle:${book.title} inauthor:${book.authorName}`
          )

          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
          )

          if (!response.ok) {
            throw new Error('Google Books request failed')
          }

          const data = await response.json()
          const items = data.items || []

          const normalize = (value) =>
            value.toLowerCase().replace(/[^a-z0-9]/g, '')

          const matchingBook = items.find((item) => {
            const info = item.volumeInfo || {}

            const titleMatches =
              normalize(info.title || '').includes(
                normalize(book.title)
              ) ||
              normalize(book.title).includes(
                normalize(info.title || '')
              )

            const authorMatches = (info.authors || []).some(
              (author) =>
                normalize(author).includes(
                  normalize(book.authorName)
                ) ||
                normalize(book.authorName).includes(
                  normalize(author)
                )
            )

            return titleMatches && authorMatches
          })

          const imageLinks = matchingBook?.volumeInfo?.imageLinks

          const cover =
            imageLinks?.extraLarge ||
            imageLinks?.large ||
            imageLinks?.medium ||
            imageLinks?.thumbnail ||
            imageLinks?.smallThumbnail ||
            ''

          return {
            ...book,
            coverPic: cover.replace('http://', 'https://'),
          }
        } catch (error) {
          console.error('Cover error:', book.title, error)

          return {
            ...book,
            coverPic: '',
          }
        }
      })
    )

    if (isMounted) {
      setBooksWithCovers(updatedBooks)
    }
  }

  fetchBookCovers()

  return () => {
    isMounted = false
  }
}, [])


  const handleSearch = () => {
    setSubmittedSearch(searchInput.trim().toLowerCase())
    setActiveFilter('All')
  }

  const handleMarkAsRead = (book) => {
    setReadBooks((previous) => {
      if (previous.some((item) => item.id === book.id)) {
        return previous
      }
      return [...previous, book]
    })

    setOngoingBooks((previous) =>
      previous.filter((item) => item.id !== book.id)
    )
  }

  const handleStartReading = (book) => {
    setOngoingBooks((previous) => {
      if (previous.some((item) => item.id === book.id)) {
        return previous
      }
      return [...previous, book]
    })

    setReadBooks((previous) =>
      previous.filter((item) => item.id !== book.id)
    )
  }

  const filteredBooks = booksWithCovers
    .filter((book) => {
      if (activeFilter === 'Top Rated Books') {
        return book.rating >= 4.5
      }

      if (activeFilter === 'Read Books') {
        return readBooks.some((item) => item.id === book.id)
      }

      if (activeFilter === 'Ongoing Books') {
        return ongoingBooks.some((item) => item.id === book.id)
      }

      return true
    })
    .filter((book) => {
      const matchesShelf =
        activeShelf === 'ALL' || book.shelf === activeShelf

      const matchesSearch =
        book.title.toLowerCase().includes(submittedSearch) ||
        book.authorName.toLowerCase().includes(submittedSearch)

      return matchesShelf && matchesSearch
    })

  return (
    <div className="books-page">

    
      <aside className="books-sidebar">
        <h2>My Library</h2>

        {bookshelvesList.map((shelf) => (
          <button
            key={shelf.id}
            className={
              activeShelf === shelf.value ? 'active-tab' : ''
            }
            onClick={() => {
              setActiveShelf(shelf.value)
              setActiveFilter('All')
            }}
          >
            {shelf.label}
          </button>
        ))}
      </aside>

     
      <main className="books-main">
        <h1>My Books</h1>

     
        <div className="search-container">
          <input
            type="search"
            placeholder="Search books by title or author..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch()
              }
            }}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

       
        <div className="home-button-container">
          <button
            className="return-home-btn"
            onClick={() => navigate('/home')}
          >
            ← Return Home
          </button>
        </div>

    
        <div className="book-filter-buttons">
          {[
            'All',
            'Top Rated Books',
            'Read Books',
            'Ongoing Books',
          ].map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter ? 'active-filter' : ''
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        
        <div className="book-list">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div className="book-item" key={book.id}>

                <div className="book-cover">
                  {book.coverPic ? (
                    <img
                      src={book.coverPic}
                      alt={`${book.title} cover`}
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="book-cover-fallback">
                      <span>📖</span>
                      <p>{book.title}</p>
                    </div>
                  )}
                </div>

                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.authorName}</p>
                  <p>⭐ {book.rating}</p>

                  <div className="book-actions">
                    <button onClick={() => handleMarkAsRead(book)}>
                      Mark as Read
                    </button>

                    <button onClick={() => handleStartReading(book)}>
                      Start Reading
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-books">No books found.</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Books
