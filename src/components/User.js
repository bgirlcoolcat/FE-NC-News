import React, { Component } from 'react';
import Loading from './Loading';
import { fetchUser } from '../containers/api';

class User extends Component {
  state = {
    user: {},
    loading: true
  };
  componentDidMount() {
    const {username} = this.props.match.params;
    fetchUser(username)
    .then(body => {
      this.setState({
        user: body.user, 
        loading: false
      })
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/404');
    });
  }
  render () {
    const {loading, user} = this.state;
    return (
      <div className="container">
        { loading ? <Loading /> : 
              <div className="row" key={user._id}>
                <div className="col-sm-1 pt-4">
                  <img 
                    className="user-profile-img" 
                    style={{ width:'100px', height: '100px' }} 
                    src={user.avatar_url} 
                    alt={user.name} 
                  />
                </div>
                <div className="col-sm-11 pt-4 pl-5">
                  <h2 className="article-h2"><span className="opening-tag">{"<"}</span>{user.name} <span className="closing-tag">/></span></h2>
                  <p><span style={{ color: 'gray' }}>Username:</span> {user.username}</p>
                </div>
              </div>
        }
      </div>
    );
  }
}

export default User;