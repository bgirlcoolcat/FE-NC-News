import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchTopics } from '../containers/api';
import './NavBar.css';

class NavBar extends Component {
  state = {
    topics: [],
  };

  componentDidMount () {
    // Returns all the topics
    fetchTopics()
    .then(body => {
      console.log('Topics:', body);
      this.setState({ 
        topics: body.topics, 
        loading: false 
      })
    });
  }

  render () {
    const { topics } = this.state;
    return (
      // eslint-disable-next-line
      <nav role="navigation" className="navbar">
        <ul className="nav-ul pl-2 ml-md-5">
          <NavLink exact to="/" className="nav-a"><button className="nav-btn"><li className="nav-li">Home</li></button></NavLink>
          { 
            topics.map(topic => {
              return <NavLink key={topic._id} to={`/topics/${topic.slug}/articles`} className="nav-a"><button className="nav-btn"><li className="nav-li">{topic.title}</li></button></NavLink>
            }) 
          }
        </ul>
      </nav>
    );
  }
}

export default NavBar;