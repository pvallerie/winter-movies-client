import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { movieIndex } from '../../api/movies'

class MovieIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of movies in our application
    this.state = {
      movies: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    movieIndex(user)
      .then(res => this.setState({ movies: res.data.movies }))
      .then(() => msgAlert({
        heading: 'Loaded movies successfully',
        message: 'All movies retrieved. Click one to see its page',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load movies',
          message: `Could not load movies: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    // extract movies state
    const { movies } = this.state

    // if we have not yet fetched any movies from API
    if (!movies) {
      return (
        // Spinner is a loading message from react-bootstrap
        <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const moviesJsx = movies.map(movie => (
      <Link key={movie._id} to={`/movies/${movie._id}`}>
        <li>
          {movie.title}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>Movies:</h3>
        <ul>
          {moviesJsx}
        </ul>
      </div>
    )
  }
}

export default MovieIndex
