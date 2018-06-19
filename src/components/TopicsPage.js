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