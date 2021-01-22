import React, { Component } from 'react'
// import withRouter so we can get access to our `Route` props (match, history, and location)
import { withRouter } from 'react-router-dom'

// import signUp and signIn functions that make axios http requests
import { signUp, signIn } from '../../api/auth'
// import pre-defined alert messages
import messages from '../AutoDismissAlert/messages'

// import a form and button from react-bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    // keep track of the email, password, and passwordConfirmation in state for use in axios http requests
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  // update the state when an input changes
  handleChange = event => {
    // event.target is the Form.Control (input) that caused the change event
    // set the state with key of `name` to Form.Control's new value
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // make sign up axios http request whenever the form is submitted
  onSignUp = event => {
    event.preventDefault()

    // extracts props. msgAlert and setUser were passed down
    // history is a route prop from withRouter
    const { msgAlert, history, setUser } = this.props

    // make sign up axios request, pass this.state so it has email, password, and passwordConfirmation
    signUp(this.state)
      // automatically makes a signIn request after signing us up
      .then(() => signIn(this.state))
      // set user state in App.js to user that signed in
      .then(res => setUser(res.data.user))
      // call msgAlert to tell user that they signed up successfully
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      // history.push will send you to the homepage (like a redirect)
      .then(() => history.push('/'))
      // if error occurs, clear form fields and set states to '' again
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        // show error message
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure (extract) email, pw, and pwconfirmation states
    const { email, password, passwordConfirmation } = this.state

    return (
      // add row to use bootstrap grid
      <div className="row">
        {/* on small screen, take up 10/12 columns. on medium and larger screens, take up 8/12 columns.
          mt-5 adds margin to top of div
          mx-auto adds margin to left and right sides automatically (centers div) */}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          {/* add bootstrap form
            when form is submitted, run `onSignUp` */}
          <Form onSubmit={this.onSignUp}>
            {/* Form.Group wraps a Form.Control (input), label, and optional help text
              controlId is used for accessability and should match Form.Control name */}
            <Form.Group controlId="email">
              {/* label for Form.Control (similar to label for input) */}
              <Form.Label>Email address</Form.Label>
              {/* Form.Control is the boostrap version of an input */}
              <Form.Control
                // required is similar to an input's required attribute
                required
                type="email"
                // name determines which state will be updated by `this.handleChange`
                name="email"
                // current value of the input (our current email state)
                value={email}
                placeholder="Enter email"
                // function to call when this Form.Control (input) changes
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* button to submit the form. uses the primary color */}
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
