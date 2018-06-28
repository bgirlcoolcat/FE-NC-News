import React, { Component } from 'react';
import Loading from './Loading';
import ArticleListing from './ArticleListing';
import ArticleVotes from './ArticleVotes';

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

  handleUpVoteEvent = articleId => {
    const updatedArticleVotes = this.state.articles.map(article => {
      if (article._id === articleId) {
        return Object.assign({}, article, {
          votes: article.votes + 1
        });
      } else {
        return article;
      }
    });

    this.setState({
      articles: updatedArticleVotes
    });

    fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${articleId}?vote=up`, { 
      method: 'PUT'
    })
    .catch(error => console.error('Error:', error));
  };

  handleDownVoteEvent = articleId => {
    const updatedArticleVotes = this.state.articles.map(article => {
      if (article._id === articleId) {
        return Object.assign({}, article, {
          votes: article.votes - 1
        });
      } else {
        return article;
      }
    });

    this.setState({
      articles: updatedArticleVotes
    });

    fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${articleId}?vote=down`, { 
      method: 'PUT'
    })
    .catch(error => console.error('Error:', error));
  };

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
              <div className="row" key={article._id}>
                <div className="col-sm-1">
                  <ArticleVotes 
                    id={article._id}
                    votes={article.votes}
                    onUpVote={this.handleUpVoteEvent}
                    onDownVote={this.handleDownVoteEvent}
                  />
                </div>
                <div className="col-sm-11 pb-3">
                  <ArticleListing 
                    id={article._id}
                    belongs_to={article.belongs_to}
                    created_by={article.created_by}
                    title={article.title}
                    comments={article.comments}
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}


export default ArticlesPage;