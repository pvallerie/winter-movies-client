import { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import singOut axios call
import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  // any time the /sign-out route renders SignOut component, this runs
  componentDidMount () {
    // extract props
    const { msgAlert, history, clearUser, user } = this.props

    // call singOut axios call and pass it the user so we have access to user's token
    signOut(user)
      // .finally() runs whether singOut is succeeds or fails
      // (as opposed to .then(), which runs on success; and .catch(), which runs on failure)
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        message: messages.signOutSuccess,
        variant: 'success'
      }))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  // add a render method that returns a falsey value, which will prevent us from ever seeing the SignOut component
  render () {
    return ''
  }
}

export default withRouter(SignOut)
