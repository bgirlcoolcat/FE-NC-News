import React, { Component } from 'react';
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
          <button className="btn-voted" onClick={this.handleUpVoteClick} disabled> 
            <span className="far fa-thumbs-up" data-toggle="tooltip" title="You have already voted"></span>
          </button> :
          <button className="btn-vote" onClick={this.handleUpVoteClick}>
            <span className="far fa-thumbs-up" data-toggle="tooltip" title="Vote up"></span>
          </button> 
        }
        <p><span className="badge badge-pill badge-danger">{this.props.votes}</span></p>
        { this.state.downVoted ? 
          <button className="btn-voted" onClick={this.handleDownVoteClick} disabled>
            <span className="far fa-thumbs-down" data-toggle="tooltip" title="You have already voted"></span>
          </button> :
          <button className="btn-vote" onClick={this.handleDownVoteClick}>
            <span className="far fa-thumbs-down" data-toggle="tooltip" title="Vote down"></span>
          </button>
        }
      </div>
    );
  }
}

export default ArticleVotes;