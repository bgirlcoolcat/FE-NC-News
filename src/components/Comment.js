import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Comments.css';

class Comment extends Component {
  state = {};

  handleDeleteCommentClick = () => {
    // Remember it is what we have called the prop in the parent, e.g. id, not _id
    this.props.onDeleteComment(this.props.id);
  }

  handleUpVoteClick = () => {
    this.props.onUpVote(this.props.id);
    // id is what I called it in Comments.js
  }

  handleDownVoteClick = () => {
    this.props.onDownVote(this.props.id);
  }

  render () {
      const date = moment(this.props.created_at)
      return (
        <article className="comments">

            <div className="comment-vote-count">
              <button className="btn-vote" onClick={this.handleUpVoteClick}>
                <span className="far fa-thumbs-up" span-toggle="fas fa-thumbs-up" data-toggle="tooltip" title="Vote up"></span>
              </button>
                <p>{this.props.votes || 0}</p>
              <button className="btn-vote" onClick={this.handleDownVoteClick}>
                <span className="far fa-thumbs-down" data-toggle="tooltip" title="Vote down"></span>
              </button>
            </div>
            
            <div className="comment-article">
              <p className="commentator">Posted by <Link to={`/users/${this.props.created_by}`}>{this.props.created_by || "northcoder"}</Link><span> - </span>{date.startOf('minute').fromNow()}</p>
              <p className="comment-text">{this.props.body || this.props.comment}</p>
              
              {this.props.created_by === "northcoder" ? 
              <button className="btn-delete-comment" onClick={this.handleDeleteCommentClick}>
              Delete comment
              </button> : 
              <button className="btn-delete-comment" onClick={()=>{ alert('You are not authorised to delete a comment posted by another user') }}>
              Delete comment
              </button>}
            </div>
            
        </article>
    );
  }
}

export default Comment;