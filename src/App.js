// if using JSX, we need to import React so Babel knows convert it to React elements
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// from the uuid (universal unique id) package, import the 4th version of uuid and call it 'uuid'
import { v4 as uuid } from 'uuid'

// import our components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

class App extends Component {
  // add a constructor to initialize state for our app
  // best practice: call super with props to set this.props in the constructor
  constructor (props) {
    super(props)

    // we won't have a user until they have signed in, so user starts as null
    // also want to keep track of msgAlerts we show the user, starts as empty because we don't have messages to show user at first
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // set user state to the passed in user (signs user in)
  setUser = user => this.setState({ user })

  // resets user state to null (signs user out)
  clearUser = () => this.setState({ user: null })

  // the deleteAlert function removes the msgAlert with the given id
  deleteAlert = (id) => {
    // updates msgAlerts state to all msgAlerts currently in state except for the msgAlert with the id passed in parameter
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // msgAlert will show a new message alert
  // it accepss a heading, message (body), and variant (bootstrap to style the alert)
  msgAlert = ({ heading, message, variant }) => {
    // creates unique ID for the message
    const id = uuid()
    // update msgAlerts state to be a new array with all msgAlerts from current state plus a new msgAlert object (using parameters)
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    // destructure (extract) msgAlert and user states from this.state
    const { msgAlerts, user } = this.state

    return (
      <Fragment>

        {/* this header is the top nav bar with our links */}
        <Header user={user} />

        {/* take each msgAlert and map it into an AutoDismissAlert element */}
        {msgAlerts.map(msgAlert => (
          // the AutoDismissAlert shows a message (alert), then automatically dissapears
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          {/* use normal Route component so we can see SignUp when we're not logged in */}
          <Route path='/sign-up' render={() => (
            // pass the msgAlert to SignUp component so it can let us know whether we've signed up successfully
            // also pass setUser function so we're automatically signed in after signing up
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* use normal Route component so we can see SignIn when we're not logged in */}
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* The AuthenticatedRoute is used similarly to a normal route, except it's passed a `user` prop to determine whether
          the user is singed in by checking whether `user` is null. AuthenticatedRoute will show if `user` is not null.
          If null, the user is redirected to the sign in page. */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
