import React, { Component } from 'react';
import Loading from './Loading';

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
      <div className="container">
        { loading ? <Loading /> : 
          users.map((user, i) => {
            return(
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
                    {/* <a style={{paddingLeft: '105px'}} href="">View repos</a> */}
                  </div>
                </div>
            );
          })
        }
      </div>
    );
  }
}

export default User;