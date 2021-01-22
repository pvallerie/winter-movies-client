// import apiUrl
import apiUrl from '../apiConfig'
// import axios to make http request
import axios from 'axios'

// singUp function accepts credentials (email, pw, pwconfirmation)
export const signUp = credentials => {
  // makes axios request and returns promise so we can use `.then` on it
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        // since `credentials` is like this.state, credentials.email is like this.state.email
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    // like signUp, but different URL
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      // like signUp, but no pwconfirmation
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

// singOut axios function needs a user to access its token
export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
