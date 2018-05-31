import React, { Component } from 'react';
import Loading from './Loading';
import { fetchOneArticle } from '../containers/api';
import './Article.css';

class Article extends Component {
  state = {
    article: null,
    loading: true
  };
  componentDidMount() {
    console.log("componentDidMount");
    const { articleId } = this.props.match.params;
    fetchOneArticle(articleId)
      .then(article => {
        // console.log(body);
        this.setState({
          article, loading: false
        })
      })
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    console.log("componentWillReceiveProps");
    const { articleId } = nextProps.match.params
    fetchOneArticle(articleId)
      .then(article => {
        this.setState({
          article,
          loading: false
        });
    });
  }
  render () {
    const {loading, article} = this.state;
    return (
      <div>
        { loading ? <Loading /> : 
          <article className="article"  key={article._id}>
          <div className="vote-count">
            <span className="far fa-thumbs-up"></span>
            <p>{article.votes}</p>
            <span className="far fa-thumbs-down"></span>
          </div>
          <div className="article-page-article">
            <h2>{article.title}</h2>
            <p>By <a href="">{article.created_by}</a><span> in </span><a href="">{article.belongs_to}</a></p>
          </div>
          <p className="article-text">{article.body}</p>
          </article>
        }
      </div>
    );
  }
}

export default Article;