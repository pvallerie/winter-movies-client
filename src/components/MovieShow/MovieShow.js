import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { movieShow } from '../../api/movies'

class MovieShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: null
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

  render () {
    const { movie } = this.state

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
        <button>Delete</button>
        <button>Update</button>
      </div>
    )
  }
}

export default withRouter(MovieShow)
