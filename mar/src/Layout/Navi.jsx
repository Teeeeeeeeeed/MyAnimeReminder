import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const Navi = () =>(
<Navbar expand="lg" className='navBar'>
  <Navbar.Brand href="#home" className='navBar'><h3 class='text'>My Anime Reminder</h3></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className='Navigation'>
      <NavLink to='/Trending' activeClassName='activeLink' className='navItem'><h4 class='text'>Trending</h4></NavLink>
      <NavLink to='/Calender' activeClassName='activeLink' className='navItem'><h4 class='text'>Calender</h4></NavLink>
      <NavLink to='/Login' activeClassName='activeLink' className='navItem'><h4 class='text'>Profile</h4></NavLink>
      <NavLink to='/Help' activeClassName='activeLink' className='navItem'><h4 class='text'>Help</h4></NavLink>
      <NavLink to='/About' activeClassName='activeLink' className='navItem'><h4 class='text'>About</h4></NavLink>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);
export default Navi;