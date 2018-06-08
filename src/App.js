import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ArticlesPage from './components/ArticlesPage';
import Article from './components/Article';
import TopicsPage from './components/TopicsPage';
import NoMatch from './components/NoMatch';
import './App.css';
import nclogo from './components/images/nc-logo-transparent.png';
import User from './components/User'; 

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
            <Route exact path="/articles" component={ArticlesPage} />
            <Route path="/articles/:articleId" component={Article} />
            <Route exact path="/users/:username" component={User} />
            <Route exact path="/topics/:topic/articles" component={TopicsPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
