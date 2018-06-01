import React, { Component } from 'react';
import './Comments.css';

class Comments extends Component {
  render () {
    return (
      <div className="comments">
      <div>
        <h4>Comments</h4>
        <a href="">Add your own comment...</a>
      </div>  
      <article>
        <div className="vote-count">
          <span className="far fa-thumbs-up"></span>
          {/* <p></p> */}
          <br />
          <span className="far fa-thumbs-down"></span>
        </div>
        <div className="comment-article">
          <p className="commentator"><a href="">Name</a><span> posted on </span>[created_at(date?)]</p>
          <p className="comment-text">Comment body...</p>
        </div>
      </article>

      <article>
        <div className="vote-count">
          <span className="far fa-thumbs-up"></span>
          {/* <p></p> */}
          <br />
          <span className="far fa-thumbs-down"></span>
        </div>
        <div className="comment-article">
          <p className="commentator"><a href="">Name</a><span> posted on </span>[created_at(date?)]</p>
          <p className="comment-text">Comment body...</p>
        </div>
      </article>

      <article>
        <div className="vote-count">
          <span className="far fa-thumbs-up"></span>
          {/* <p></p> */}
          <br />
          <span className="far fa-thumbs-down"></span>
        </div>
        <div className="comment-article">
          <p className="commentator"><a href="">Name</a><span> posted on </span>[created_at(date?)]</p>
          <p className="comment-text">Comment body...</p>
        </div>
      </article>

      </div>
    );
  }
}

export default Comments;