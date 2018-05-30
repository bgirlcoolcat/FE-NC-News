import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <ul className="nav-ul">
        <NavLink to="/" className="nav-a"><li className="nav-li">Home | </li></NavLink>
        <NavLink to="/topics/football/articles" className="nav-a"><li className="nav-li">Football | </li></NavLink>
        <NavLink to="/topics/cooking/articles" className="nav-a"><li className="nav-li">Cooking | </li></NavLink>
        <NavLink to="/topics/coding/articles" className="nav-a"><li className="nav-li">Coding</li></NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;