import React from 'react';

const ArticleVotes = props => {

  return (
    <div className="vote-count">
      <span className="far fa-thumbs-up"></span>
      <p>{props.votes}</p>
      <span className="far fa-thumbs-down"></span>
    </div>
  );
}

export default ArticleVotes;