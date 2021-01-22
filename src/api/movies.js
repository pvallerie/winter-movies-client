import apiUrl from '../apiConfig'
import axios from 'axios'

export const movieIndex = user => {
  return axios({
    url: apiUrl + '/movies',
    method: 'GET',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const movieCreate = (movie, user) => {
  return axios({
    url: apiUrl + '/movies',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { movie }
  })
}

export const movieShow = (id, user) => {
  return axios({
    url: apiUrl + '/movies/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}
