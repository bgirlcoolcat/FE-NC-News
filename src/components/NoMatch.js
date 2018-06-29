import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="alert alert-danger" role="alert">
      <div className="container pl-md-1">
        <h2><span className="opening-tag">{"<"}</span>404 <span className="closing-tag">/></span> Sorry - the page you have requested does not exist</h2>
        <Link to="/" style={{ color: '#c1002e' }}>Go to the home page</Link>
      </div>
    </div>
  ); 
}

export default NoMatch;