import React, { Component } from 'react';
import Loading from './Loading';
import ArticleListing from './ArticleListing';
import ArticleVotes from './ArticleVotes';
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
      // console.log(body);
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
                  <ArticleVotes 
                    id={article._id}
                    votes={article.votes}
                  />
                  <ArticleListing 
                    id={article._id}
                    belongs_to={article.belongs_to}
                    created_by={article.created_by}
                    title={article.title}
                    comments={article.comments}
                  />
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