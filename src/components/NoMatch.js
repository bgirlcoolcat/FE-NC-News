import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="alert alert-warning" role="alert">
      <h2>404: Sorry - the page you have requested does not exist</h2>
      <Link to="/">Go to the home page</Link>
    </div>
  ); 
}

export default NoMatch;