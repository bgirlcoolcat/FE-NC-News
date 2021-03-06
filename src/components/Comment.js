import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PT from 'prop-types';
import Button from './Button';
import './Comments.css';


class Comment extends Component {
  state = {};

  handleDeleteCommentClick = () => {
    this.props.onDeleteComment(this.props.id);
  }

  handleUpVoteClick = () => {
    this.setState({
      upVoted: !this.props.upVoted
    })
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
      <div className="row py-3" style={{ borderBottom: 'dotted #595959 1px' }}>
        <div className="col-sm-1 comment-vote-count">
          <Button btnClass={this.state.upVoted ? "comment-voted" : "comment-vote"} onClick={this.handleUpVoteClick} isDisabled={this.state.upVoted}> 
            <span className="far fa-thumbs-up" span-toggle="fas fa-thumbs-up" data-toggle="tooltip" title={this.state.upVoted ? "You have already voted up" : "Vote up"}></span>
          </Button>
          <p className="m-0"><span className="badge badge-pill badge-danger">{this.props.votes || 0}</span></p>
          <Button btnClass={this.state.downVoted ? "comment-voted" : "comment-vote"} onClick={this.handleDownVoteClick} isDisabled={this.state.downVoted}>
            <span className="far fa-thumbs-down" data-toggle="tooltip" title={this.state.downVoted ? "You have already voted down" : "Vote down"}></span>
          </Button>
        </div>
          
        <div className="col-sm-11">
          <p className="commentator">Posted by <Link to={`/users/${this.props.created_by}`} style={{ color: '#c1002e' }}>{this.props.created_by || "northcoder"}</Link><span> - </span>{date.startOf('minute').fromNow()}</p>
          <p className="comment-text">{this.props.body || this.props.comment}</p>
          
          <Button btnClass="delete-comment" onClick={ this.props.created_by === "northcoder" ? this.handleDeleteCommentClick : ()=>{ alert('You are not authorised to delete a comment posted by another user')} }>
            <span className="opening-tag-delete-btn">{"<"}</span>Delete comment <span className="closing-tag-delete-btn">/></span>
          </Button> 
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  onDeleteComment: PT.func.isRequired,
  id: PT.string.isRequired,
  onUpVote: PT.func.isRequired,
  onDownVote: PT.func.isRequired,
  created_at: PT.number.isRequired,
  votes: PT.number.isRequired,
  created_by: PT.string.isRequired,
  body: PT.string.isRequired,
};

export default Comment;