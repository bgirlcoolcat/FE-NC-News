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
          { this.state.upVoted ? 
            <Button btnClass="comment-voted" onClick={this.handleUpVoteClick} isDisabled={true}> 
              <span className="far fa-thumbs-up" span-toggle="fas fa-thumbs-up" data-toggle="tooltip" title="You have already voted up"></span>
            </Button> :
            <Button btnClass="comment-vote" onClick={this.handleUpVoteClick}>
              <span className="far fa-thumbs-up" span-toggle="fas fa-thumbs-up" data-toggle="tooltip" title="Vote up"></span>
            </Button> 
          }
            <p className="m-0"><span className="badge badge-pill badge-danger">{this.props.votes || 0}</span></p>
          { this.state.downVoted ? 
            <Button btnClass="comment-voted" onClick={this.handleDownVoteClick} isDisabled={true}>
              <span className="far fa-thumbs-down" data-toggle="tooltip" title="You have already voted down"></span>
            </Button> :
            <Button btnClass="comment-vote" onClick={this.handleDownVoteClick}>
              <span className="far fa-thumbs-down" data-toggle="tooltip" title="Vote down"></span>
            </Button>
          }
        </div>
          
        <div className="col-sm-11">
          <p className="commentator">Posted by <Link to={`/users/${this.props.created_by}`} style={{ color: '#c1002e' }}>{this.props.created_by || "northcoder"}</Link><span> - </span>{date.startOf('minute').fromNow()}</p>
          <p className="comment-text">{this.props.body || this.props.comment}</p>
          
          {this.props.created_by === "northcoder" ? 
          <Button btnClass="delete-comment" onClick={this.handleDeleteCommentClick}>
          <span className="opening-tag-delete-btn">{"<"}</span>Delete comment <span className="closing-tag-delete-btn">/></span>
          </Button> : 
          <Button btnClass="delete-comment" onClick={()=>{ alert('You are not authorised to delete a comment posted by another user') }}>
          <span className="opening-tag-delete-btn">{"<"}</span>Delete comment <span className="closing-tag-delete-btn">/></span>
          </Button>}
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