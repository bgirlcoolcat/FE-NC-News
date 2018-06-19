import React, { Component } from 'react';

class ArticleVotes extends Component {
  state={};

  handleUpVoteClick = () => this.props.onUpVote(this.props.id);
  handleDownVoteClick = () => this.props.onDownVote(this.props.id);

  render () {
    return (
      <div className="vote-count">
        <button className="btn-vote" onClick={this.handleUpVoteClick}>
          <span className="far fa-thumbs-up" span-toggle="fas fa-thumbs-up" data-toggle="tooltip" title="Vote up"></span>
        </button>
        <p>{this.props.votes}</p>
        <button className="btn-vote" onClick={this.handleDownVoteClick}>
          <span className="far fa-thumbs-down" data-toggle="tooltip" title="Vote down"></span>
        </button>
      </div>
    );
  }
}

export default ArticleVotes;