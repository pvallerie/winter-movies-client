import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { movieShow, movieDelete } from '../../api/movies'

class MovieShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: null,
      exists: true
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    movieShow(match.params.id, user)
      .then(res => this.setState({ movie: res.data.movie }))
      .then(() => msgAlert({
        heading: 'Showing Movie successfully',
        message: 'The Movie is now displayed',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Movie failed',
          message: `Failed to show Movie with error: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  onMovieDelete = () => {
    const { user, match, msgAlert } = this.props

    movieDelete(match.params.id, user)
      .then(() => msgAlert({
        heading: 'Deleted Movie successfully',
        message: 'The Movie has been deleted',
        variant: 'success'
      }))
      .then(this.setState({ exists: false }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting Movie failed',
          message: `Failed to delete Movie with error: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    const { movie, exists } = this.state

    if (!exists) {
      return <Redirect to={'/movies'} />
    }

    if (!movie) {
      return (
        // Spinner is a loading message from react-bootstrap
        <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    return (
      <div>
        <h3>{movie.title}</h3>
        <h4>Director: {movie.director}</h4>
        <button onClick={this.onMovieDelete}>Delete</button>
        <button>
          <Link to={`/update-movie/${movie._id}`}>Update</Link>
        </button>
      </div>
    )
  }
}

export default withRouter(MovieShow)
