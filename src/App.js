import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ArticlesPage from './components/ArticlesPage';
import Article from './components/Article';
import './App.css';
import nclogo from './components/images/nc-logo-transparent.png';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={nclogo} className="App-logo" alt="logo" />
            <h1 className="App-title">NC News App</h1>
            <NavBar />
          </header>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/articles" component={ArticlesPage} />
            {/* <Route path="/articles/:id" component={Article} /> */}
            <Route path="/article" component={Article} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const NoMatch = props => {
  return (
    <div className="alert alert-warning" role="alert">
      <h2>404: Sorry - the page you have requested does not exist</h2>
      <Link to="/">Go to the home page</Link>
    </div>
  ); 
}

export default App;
