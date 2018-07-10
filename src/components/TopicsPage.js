import React, { Component } from 'react';
import Loading from './Loading';
import { fetchTopic } from '../containers/api';
import ArticleListing from './ArticleListing';
import ArticleVotes from './ArticleVotes';


class TopicsPage extends Component {
  state = {
    articles: [],
    loading: true
  };
  componentDidMount () {
    const {topic} = this.props.match.params;
    fetchTopic(topic)
    .then(body => {
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
    this.setState({ loading: true }, () => {
      const {topic} = this.props.match.params
      fetchTopic(topic)
      .then(body => {
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
    return (
      <div className="container pl-md-1">
        <div className="row">
          <div className="col-sm-12">
            <h5 style={{ padding: '1.2rem 0' }}><span className="opening-tag">{"<"}</span>{articles.length} {topic} articles <span className="closing-tag">/></span></h5>
          </div>
        </div>
        
        { loading ? <Loading /> : 
          articles
            .map(article => {
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


export default TopicsPage;