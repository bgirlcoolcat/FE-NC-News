import React, { Component } from 'react';
import PT from 'prop-types';
import Button from './Button';
import './ArticleVotes.css';


class ArticleVotes extends Component {
  state = {
    upVoted: false,
    downVoted: false,
  };

  handleUpVoteClick = () => {
    this.setState({
      upVoted: !this.state.upVoted
    })
    this.props.onUpVote(this.props.id);
  }

  handleDownVoteClick = () => {
    this.setState({
      downVoted: !this.state.downVoted
    })
    this.props.onDownVote(this.props.id);
  }

  render () {
    return (
      <div className="vote-count">
        <Button btnClass={this.state.upVoted ? "voted" : "vote"} onClick={this.handleUpVoteClick} isDisabled={this.state.upVoted}> 
          <span className="far fa-thumbs-up" data-toggle="tooltip" title={this.state.upVoted ? "You have already voted up" : "Vote up"}></span>
        </Button>
        <p><span className="badge badge-pill badge-danger">{this.props.votes}</span></p>
        <Button btnClass={this.state.downVoted ? "voted" : "vote"} onClick={this.handleDownVoteClick} isDisabled={this.state.downVoted}>
          <span className="far fa-thumbs-down" data-toggle="tooltip" title={this.state.downVoted ? "You have already voted down" : "Vote down"}></span>
        </Button>
      </div>
    );
  }
}

ArticleVotes.propTypes = {
  onUpVote: PT.func.isRequired,
  id: PT.string.isRequired,
  onDownVote: PT.func.isRequired,
  votes: PT.number.isRequired,
};

export default ArticleVotes;