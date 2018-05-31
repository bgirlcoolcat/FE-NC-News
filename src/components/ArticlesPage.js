import React, { Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import './ArticlesPage.css';

class ArticlesPage extends Component {
  state = {
    articles: [],
    loading: true
  };
  componentDidMount () {
    // Returns all the articles
    fetch(`https://northcoders-news-api.herokuapp.com/api/articles`)
      .then(res => {
        return res.json();
    })
    .then(body => {
      console.log(body);
      this.setState({ 
        articles: body.articles, 
        loading: false 
      })
    });
  }
  render () {
    const { articles, loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : 
          articles
          .filter((article) => {
            return article.votes >= 2120
          }).sort((a, b) => b.votes - a.votes)
          .map((article, i) => {
            return (
              <ul className="article-page-ul" key={article._id}>
              <li>
                <div className="vote-count">
                  <span className="far fa-thumbs-up"></span>
                  <p>{article.votes}</p>
                  <span className="far fa-thumbs-down"></span>
                </div>
                <div className="article-page-article">
                  <Link to={`/articles/${article._id}`}><h2>{article.title}</h2></Link>
                  <p>By <a href="">{article.created_by}</a><span> in </span><Link to={`/topics/${article.belongs_to}/articles`}>{article.belongs_to}</Link></p>
                </div>
              </li>
              </ul>
            );
          })
        }
      </div>
    );
  }
}


export default ArticlesPage;