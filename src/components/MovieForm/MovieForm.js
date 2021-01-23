import React from 'react'

const MovieForm = ({ movie, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder='Enter movie title'
      // this name should line up with the state we want to change
      name='title'
      value={movie.title}
      onChange={handleChange}
    />
    <label>Director</label>
    <input
      placeholder='Enter movie director'
      // this name should line up with the state we want to change
      name='director'
      value={movie.director}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)

export default MovieForm
