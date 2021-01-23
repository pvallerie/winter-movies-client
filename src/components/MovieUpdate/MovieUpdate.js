import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import MovieForm from '../MovieForm/MovieForm'
import { movieUpdate } from '../../api/movies'

class MovieUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: {
        title: '',
        director: ''
      },
      updatedId: false
    }
  }

  handleChange = (event) => {
    event.persist()

    this.setState(currentState => {
      const updatedMovie = { ...currentState.movie, [event.target.name]: event.target.value }
      return { movie: updatedMovie }
    })
  }

  handleSubmit = (event) => {
    const { user, match, msgAlert } = this.props
    const { movie } = this.state
    event.preventDefault()
    console.log(user.token)
    movieUpdate(movie, match.params.id, user)
      .then(this.setState({ updatedId: true }))
      .then(res => msgAlert({
        heading: 'Movie updated successfully',
        message: `${movie.title} has been updated`,
        variant: 'success'
      }))
      .catch(console.error)
  }

  render () {
    const { movie, updatedId } = this.state
    const { match } = this.props

    if (updatedId) {
      return <Redirect to={`/movies/${match.params.id}`} />
    }

    return (
      <Fragment>
        <h3>Update Movie:</h3>
        <MovieForm
          movie={movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default withRouter(MovieUpdate)
