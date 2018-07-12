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
        { this.state.upVoted ? 
          <Button btnClass="voted" onClick={this.handleUpVoteClick} isDisabled={true}> 
            <span className="far fa-thumbs-up" data-toggle="tooltip" title="You have already voted up"></span>
          </Button> :
          <Button btnClass="vote" onClick={this.handleUpVoteClick}>
            <span className="far fa-thumbs-up" data-toggle="tooltip" title="Vote up"></span>
          </Button> 
        }
        <p><span className="badge badge-pill badge-danger">{this.props.votes}</span></p>
        { this.state.downVoted ? 
          <Button btnClass="voted" onClick={this.handleDownVoteClick} isDisabled={true}>
            <span className="far fa-thumbs-down" data-toggle="tooltip" title="You have already voted down"></span>
          </Button> :
          <Button btnClass="vote" onClick={this.handleDownVoteClick}>
            <span className="far fa-thumbs-down" data-toggle="tooltip" title="Vote down"></span>
          </Button>
        }
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