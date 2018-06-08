import React, { Component } from 'react';
import Loading from './Loading';
import { fetchOneArticle } from '../containers/api';
import { Link, Route } from 'react-router-dom';
import Comments from './Comments';
import './Article.css';

class Article extends Component {
  state = {
    article: null,
    loading: true,
    shown: false
  };

  toggle() {
		this.setState({
			shown: !this.state.shown
    });
  }

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
          loading: false,
        });
    });
  }
  render () {
    let shown = {
			display: this.state.shown ? "block" : "none"
		};
		
		let hidden = {
			display: this.state.shown ? "none" : "block"
		}
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
            <p>By <Link to={`/users/${article.created_by}`}>{article.created_by}</Link><span> in </span><Link to={`/topics/${article.belongs_to}/articles`}>{article.belongs_to}</Link></p>
          </div>
          <p className="article-text">{article.body}</p>

          <p style={ shown } onClick={this.toggle.bind(this)}><Link to={`/articles/${article._id}/comments`}>Show comments</Link></p>
          <p style={ hidden } onClick={this.toggle.bind(this)}><Link to={`/articles/${article._id}`}>Hide comments</Link></p>

          </article>
        }
        <Route path="/articles/:articleId/comments" component={Comments} />
      </div>
    );
  }
}

export default Article;