import React, { Fragment } from 'react'

// import Nav and Navbar from react-bootstrap
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// these links are shown when the user is signed in (authenticated)
const authenticatedOptions = (
  <Fragment>
    {/* bootstrap nav links are different than react-router links
    note they have an `href` prop instead of a `to` prop and they start with a # */}
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#create-movie">Create Movie</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

// these links are shown when user is not signed in (unauthenticated)
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// these links are shown whether user is signed in or signed out
const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  // bg primary sets our background to our primary color
  // variant dark sets our variant color to contrast the background
  // expand sets when the nav will toggle from mobile (hamburger menu) to normal nav
  <Navbar bg="primary" variant="dark" expand="md">
    {/* href='#' links the logo to the homepage */}
    <Navbar.Brand href="#">
      Movies
    </Navbar.Brand>
    {/* Navbar.Toggle is the toggle that shows hamburger menu button on smaller screens  */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    {/* Navbar.Collapse contains links that only show up when hamburger menu is clicked on
      aria-controls of Navbar.Toggle need to match id of Navbar.Collapse */}
    <Navbar.Collapse id="basic-navbar-nav">
      {/* Nav component contains our navigation links
        ml-auto means margin left should be set automatically, which takes up remaining space
        aligns the links to the far right of the navbar */}
      <Nav className="ml-auto">
        {/* if user is truthy value, display 'welcome, user' in nav
        navbar-text uses same stylling as Nav.Links */}
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* always render the alwaysOptions links */}
        { alwaysOptions }
        {/* user is a truthy value, show authenticatedOptions. if user is a falsey value (null), show unauthenticatedOptions */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
