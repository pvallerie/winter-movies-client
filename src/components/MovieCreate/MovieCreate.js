import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import MovieForm from '../MovieForm/MovieForm'
import { movieCreate } from '../../api/movies'

class MovieCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: {
        title: '',
        director: ''
      },
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { movie } = this.state

    // call movieCreate axios request and pass it movie and user states as props
    movieCreate(movie, user)
      .then(res => {
        this.setState({ createdId: res.data.movie._id })
        return res
      })
      .then(res => msgAlert({
        heading: 'Movie created successfully',
        message: `Movie created! Now viewing ${res.data.movie.title}`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Movie',
          message: `Could not create Movie with error: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  // when an input changes, update state that corresponds with inputs name
  handleChange = event => {
    event.persist()
    this.setState(state => {
      // return our state chagne
      return {
        // set the movie state to what it used to be (...state.movie)
        // but replace the property with `name` to its current `value`
        movie: { ...state.movie, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { movie, createdId } = this.state

    if (createdId) {
      return <Redirect to={`/movies/${createdId}`} />
    }

    return (
      <div>
        <h3>Create Movie</h3>
        <MovieForm
          movie={movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default MovieCreate
