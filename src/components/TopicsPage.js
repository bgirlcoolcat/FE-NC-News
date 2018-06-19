import React, { Component } from 'react';
import Loading from './Loading';
import { fetchTopic } from '../containers/api';
import ArticleListing from './ArticleListing';
import ArticleVotes from './ArticleVotes';
import './ArticlesPage.css';

class TopicsPage extends Component {
  state = {
    articles: [],
    loading: true
  };
  componentDidMount () {
    console.log('componentDidMount');
    // Return all the articles for a certain topic
    const {topic} = this.props.match.params;
    fetchTopic(topic)
      .then(body => {
        console.log('Topic', body);
        this.setState({ 
          articles: body.articles, 
          loading: false
        })
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/404')
      });
  }
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps');
    this.setState({ loading: true }, () => {
      const {topic} = this.props.match.params
      fetchTopic(topic).then(body => {
        this.setState({
          articles: body.articles, 
          loading: false
        })
      }); 
    })
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
    const { topic } = this.props.match.params;
    // console.log(topic);
    return (
      <div>
        <h5 style={{ padding: '20px 0 20px 56px' }}>{articles.length} {topic} articles</h5>
        { loading ? <Loading /> : 
          articles
            .map((article) => {
              return (
                <ul className="article-page-ul" key={article._id}>
                  <li>
                    <ArticleVotes 
                      id={article._id}
                      votes={article.votes}
                      onUpVote={this.handleUpVoteEvent}
                      onDownVote={this.handleDownVoteEvent}
                    />
                    <ArticleListing 
                      key={article._id}
                      id={article._id}
                      belongs_to={article.belongs_to}
                      created_by={article.created_by}
                      votes={article.votes}
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


export default TopicsPage;