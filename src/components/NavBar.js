import React from 'react'
import { Container } from 'react-bootstrap'
import { Navbar, Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import Avatar from './Avatar'
import axios from 'axios'
import useClickOutsideToggle from '../hooks/useClickOutsideToggle'

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout');
      setCurrentUser(null);
    }
    catch (err) {
      console.log(err);
    }
  }

  const addPostIcon = (
    <NavLink to="/posts/create" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="far fa-plus-square"></i>Add Post
    </NavLink>
  )

  const loggedInIcons = (<>
    <NavLink to="/feed" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fas fa-stream"></i>Feed
    </NavLink>
    <NavLink to="/liked" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fas fa-heart"></i>Liked
    </NavLink>
    <NavLink to="/" className={styles.NavLink} onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign Out
    </NavLink>
    <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.NavLink} activeClassName={styles.Active}>
        <Avatar src={currentUser?.profile_image} text="Profile" height={40}  />
    </NavLink>
  </>);

  const loggedOutIcons = (<>
    <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fas fa-sign-in-alt"></i>Sign-in
    </NavLink>
    <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i>Sign-up
    </NavLink>
  </>);

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top"><Container>
    <NavLink to="/">
        <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
    </NavLink>
    <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-left">
        <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
            <i className="fas fa-home"></i>Home
        </NavLink>
        {currentUser && addPostIcon}
        {currentUser ? loggedInIcons: loggedOutIcons}
        </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default NavBar