import React from 'react'
// import React Bootstrap Alert
import Alert from 'react-bootstrap/Alert'
// import stylesheet for Alert component
import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  // add a constructor to initialize state and keep track of `timeoutId`
  constructor (props) {
    super(props)

    // we want to show the AutoDismissAlert by default
    this.state = {
      show: true
    }

    // `timeoutId` is used to calcel our setTimeout call
    this.timeoutId = null
  }

  // this function runs once the component is first mounted
  componentDidMount () {
    // calls `this.handleClose` after 5seconds (5000ms)
    // `setTimeout` returns a `timeoutId` so we can cancel the timeout
    this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  // this function is called when component is unmounted
  componentWillUnmount () {
    // calling `clearTimeout` will cancel the timer
    clearTimeout(this.timeoutId)
  }

  // `handleClose` sets show state to false, which hides the `AutoDismissAlert` component
  handleClose = () => this.setState({ show: false })

  render () {
    // destructure all props given to `AutoDismissAlert`
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        deleteAlert(id)
      }, 300)
    }

    return (
      // show our Bootstrap alert
      <Alert
        // the `dismissible` prop shows the 'x' in top right corner to close alert
        dismissible
        // if true, will show the alert, otherwise alert will be hidden
        show={this.state.show}
        // the variant is the alert color
        variant={variant}
        // the `onClose` prop will be run whenever the user clicks the close button
        // it uses `handleClose` to set the show prop to false
        onClose={this.handleClose}
      >
        <div className="container">
          {/* heading (title) of the alert */}
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          {/* the body (message) of the alert */}
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
