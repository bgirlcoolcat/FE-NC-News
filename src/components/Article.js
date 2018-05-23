import React, { Component } from 'react';
import './Article.css';

class Article extends Component {
  render () {
    return (
      <article className="article">
        <div className="vote-count">
          <span className="far fa-thumbs-up"></span>
          <p>10</p>
          <span className="far fa-thumbs-down"></span>
        </div>
        <div className="article-page-article">
          <a href="/Article"><h2>Article Title</h2></a>
          <p>By <a href="">Name</a><span> in </span><a href="">Topic</a></p>
        </div>
        <p className="article-text">Article text goes here...</p>
      </article>
    );
  }
}

export default Article;