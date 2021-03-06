import React, { Component } from 'react';
import Loading from './Loading';
import { fetchOneArticle, putArticleVoteUp, putArticleVoteDown } from '../containers/api';
import { Link, Route } from 'react-router-dom';
import Comments from './Comments';
import ArticleVotes from './ArticleVotes';
import './Article.css';

class Article extends Component {
  state = {
    article: {},
    loading: true,
    shown: false
  };

  toggle() {
		this.setState({
			shown: !this.state.shown
    });
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    fetchOneArticle(articleId)
      .then(article => {
        this.setState({
          article: article.article, 
          loading: false
        })
      })
  }
  componentWillReceiveProps(nextProps) {
    const { articleId } = nextProps.match.params
    fetchOneArticle(articleId)
      .then(article => {
        this.setState({
          article: article.article,
          loading: false,
        });
    });
  }

  handleUpVoteEvent = () => {
    const { articleId } = this.props.match.params;
    this.setState({
      article: Object.assign({}, this.state.article, { votes: this.state.article.votes + 1 })
    });
    putArticleVoteUp(articleId)
  };

  handleDownVoteEvent = () => {
    const { articleId } = this.props.match.params;
    this.setState({
      article: Object.assign({}, this.state.article, { votes: this.state.article.votes - 1 })
    });
    putArticleVoteDown(articleId)
  };

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
        <div className="container pl-md-1">
        { loading ? <Loading /> : 
          <div className="row pt-4">
            <div className="col-sm-1">
              <ArticleVotes 
                id={article._id} 
                votes={article.votes}
                onUpVote={this.handleUpVoteEvent}
                onDownVote={this.handleDownVoteEvent}
              />
            </div>
            <div className="col-sm-11">
              <h2 className="article-h2"><span className="opening-tag">{"<"}</span>{article.title} <span className="closing-tag">/></span></h2>
              <p>By <Link to={`/users/${article.created_by}`} style={{ color: '#c1002e' }}>{article.created_by}</Link><span> in </span><Link to={`/topics/${article.belongs_to}/articles`} style={{ color: '#c1002e' }}>{article.belongs_to}</Link></p>
            </div>
            <div className="col-sm-12">
              <p>{article.body}</p>
              <p style={ shown } onClick={this.toggle.bind(this)}><Link to={`/articles/${article._id}/comments`} style={{ color: '#c1002e' }}>Show comments</Link></p>
              <p style={ hidden } onClick={this.toggle.bind(this)}><Link to={`/articles/${article._id}`} style={{ color: '#c1002e' }}>Hide comments</Link></p>
            </div>
          </div>
        }
        </div>
        <Route path="/articles/:articleId/comments" component={Comments} />
      </div>
    );
  }
}

export default Article;