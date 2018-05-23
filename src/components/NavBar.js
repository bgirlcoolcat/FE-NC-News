import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <ul className="nav-ul">
        <li className="nav-li"><a className="nav-a" href="">Home | </a></li>
        <li className="nav-li"><a className="nav-a" href="">Football | </a></li>
        <li className="nav-li"><a className="nav-a" href="">Cooking | </a></li>
        <li className="nav-li"><a className="nav-a" href="">Coding</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;