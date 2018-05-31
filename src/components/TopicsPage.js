import React, { Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { fetchTopic } from '../containers/api';
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
    console.log(topic);
    return (
      <div>
        <h5 style={{ padding: '20px 0 20px 56px' }}>{articles.length} {topic} articles</h5>
        { loading ? <Loading /> : 
          articles
            .map((article) => {
              return (
                <ul className="article-page-ul" key={article._id}>
                <li>
                  <div className="vote-count">
                    <span className="far fa-thumbs-up"></span>
                    <p>{article.votes}</p>
                    <span className="far fa-thumbs-down"></span>
                  </div>
                  <div className="article-page-article">
                    <Link to="/article"><h2>{article.title}</h2></Link>
                    <p>By <a href="">{article.created_by}</a><span> in </span><a href="">{article.belongs_to}</a></p>
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


export default TopicsPage;