import React from 'react'
import { Link } from 'react-router-dom';
// Navbar.jsx
const Navbar = () => {
  return (
    <>
      <Link to="/about">About</Link>
	  <Link to="/register">Register</Link>
	  <Link to="/login">Login</Link>
    </>
  );
};
export default Navbar;
