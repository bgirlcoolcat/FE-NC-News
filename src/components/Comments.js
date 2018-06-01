import React, { Component } from 'react';
import { fetchComments } from '../containers/api';
import Loading from './Loading';
import moment from 'moment';
import './Comments.css';

class Comments extends Component {
  state = {
    comments: [],
    loading: true
  };

  componentDidMount () {
    // Get all the comments for a individual article
    const { articleId } = this.props.match.params;
    fetchComments(articleId)
      .then(body => {
        console.log(body);
        this.setState({
          comments: body.comments, 
          loading: false
        })
      });
  }
  render () {
    const { comments, loading } = this.state;
    return (
      <div>
        <div className="comments">
          <h4>Comments</h4>
          <a href="">Add your own comment...</a>
        </div>  
        <div>
          { loading ? <Loading /> : 
            comments.map(comment => {
              const date = moment(comment.created_at);
              return (
                <article key={comment._id} className="container">
                  <div className="comment-vote-count">
                    <span className="far fa-thumbs-up"></span>
                    <p>{comment.votes}</p>
                    <span className="far fa-thumbs-down"></span>
                  </div>
                  <div className="comment-article">
                    <p className="commentator">Posted by <a href="">{comment.created_by}</a><span> - </span>{date.startOf('hour').fromNow()}</p>
                    <p className="comment-text">{comment.body}</p>
                  </div>
                </article>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Comments;