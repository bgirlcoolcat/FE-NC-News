import React, { Component } from 'react';
import NavBar from './components/NavBar';
import nclogo from './components/images/nc-logo-transparent.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={nclogo} className="App-logo" alt="logo" />
          <h1 className="App-title">NC News App</h1>
          <NavBar />
        </header>
      </div>
    );
  }
}

export default App;
