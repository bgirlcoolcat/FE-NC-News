import React, { Component } from 'react';
import Loading from './Loading';
import './User.css';

class User extends Component {
  state = {
    users: [],
    loading: true
  };
  componentDidMount() {
    const {username} = this.props.match.params;
    fetch(`https://northcoders-news-api.herokuapp.com/api/users/${username}`)
      .then(res => {
        return res.json()
      })
      .then(body => {
        console.log(body);
        this.setState({
          users: body.users, 
          loading: false
        })
      })
  }
  render () {
    const {loading, users} = this.state;
    return (
      <div>
        { loading ? <Loading /> : 
          users.map((user, i) => {
            return(
                <div className="user-page" key={user._id}>
                  <img 
                    className="user-profile-img" 
                    style={{width:'100px', height: '100px', padding: '10px 10px 0 0'}} 
                    src={user.avatar_url} 
                    alt={user.name} 
                  />
                  <h2 className="user-page-heading" style={{display: 'inline'}}>{user.name}</h2>
                  <p style={{paddingLeft: '105px', marginTop: '-20px'}}>Username: {user.username}</p>
                  {/* <a style={{paddingLeft: '105px'}} href="">View repos</a> */}
                </div>
            );
          })
        }
      </div>
    );
  }
}

export default User;