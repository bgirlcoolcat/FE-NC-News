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
    this.setState({
      upVoted: !this.props.upVoted
    })
    // id is what I called it in Comments.js
    this.props.onUpVote(this.props.id);
  }

  handleDownVoteClick = () => {
    this.setState({
      downVoted: !this.props.downVoted
    })
    this.props.onDownVote(this.props.id);
  }

  render () {
      const date = moment(this.props.created_at)
      return (
        <article className="comments">

          <div className="comment-vote-count">
          { this.state.upVoted ? 
            <button className="btn-voted-comment" onClick={this.handleUpVoteClick} disabled> 
              <span className="far fa-thumbs-up" span-toggle="fas fa-thumbs-up" data-toggle="tooltip" title="You have already voted"></span>
            </button> :
            <button className="btn-vote-comment" onClick={this.handleUpVoteClick}>
              <span className="far fa-thumbs-up" span-toggle="fas fa-thumbs-up" data-toggle="tooltip" title="Vote up"></span>
            </button> 
          }
            <p style={{ fontWeight: 700 }}>{this.props.votes || 0}</p>
          { this.state.downVoted ? 
            <button className="btn-voted-comment" onClick={this.handleDownVoteClick} disabled>
              <span className="far fa-thumbs-down" data-toggle="tooltip" title="You have already voted"></span>
            </button> :
            <button className="btn-vote-comment" onClick={this.handleDownVoteClick}>
              <span className="far fa-thumbs-down" data-toggle="tooltip" title="Vote down"></span>
            </button>
          }
          </div>
            
          <div className="comment-article">
          <p className="commentator">Posted by <Link to={`/users/${this.props.created_by}`} style={{ color: '#c1002e' }}>{this.props.created_by || "northcoder"}</Link><span> - </span>{date.startOf('minute').fromNow()}</p>
            <p className="comment-text">{this.props.body || this.props.comment}</p>
            
            {this.props.created_by === "northcoder" ? 
            <button className="btn btn-outline-secondary btn-sm" onClick={this.handleDeleteCommentClick}>
            <span className="opening-tag-delete-btn">{"<"}</span>Delete comment <span className="closing-tag-delete-btn">/></span>
            </button> : 
            <button className="btn btn-outline-secondary btn-sm" onClick={()=>{ alert('You are not authorised to delete a comment posted by another user') }}>
            <span className="opening-tag-delete-btn">{"<"}</span>Delete comment <span className="closing-tag-delete-btn">/></span>
            </button>}
          </div>
            
        </article>
    );
  }
}

export default Comment;