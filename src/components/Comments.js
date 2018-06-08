import React, { Component } from 'react';
import { fetchComments, deleteComment } from '../containers/api';
import Loading from './Loading';
import moment from 'moment';
import AddCommentsForm from './AddCommentForm';
import { Link } from 'react-router-dom';
// import uuid from 'uuid';
import './Comments.css';

class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    articleId: this.props.match.params.articleId
  };

  componentDidMount () {
    // Get all the comments for a individual article
    const { articleId } = this.props.match.params;
    fetchComments(articleId)
      .then(body => {
        // console.log(body);
        this.setState({
          comments: body.comments, 
          loading: false
        })
      });
  }

  addComment = comment => {
    // console.log(`Add comment with value: ${comment}`);

    // I don't seem to need this if I post to the api?
    // const commentId = uuid.v4();

    const newComment = {
      comment,
      // commentId
    };

    const newComments = this.state.comments.concat([newComment]);

    this.setState({ 
      comments: newComments 
    });
  };

  removeNCComment = comment => {
    // console.log('Remove NCComment:', comment);

    if (comment.created_by === "northcoder") {
      const updatedComments = this.state.comments.filter(item => {
        return item !== comment;
      })

      this.setState({
        comments: updatedComments
      })

      deleteComment(comment._id)
    }
  };

  render () {
    const { comments, loading, articleId } = this.state;
    return (
      <div>
        <div className="comments">
          <h4>Comments</h4>
          {/* <a href="">Add your own comment...</a> */}
          <AddCommentsForm addComment={this.addComment} articleId={articleId} />
        </div>  
        <div>
          { loading ? <Loading /> : 
            comments.map((comment, commentId) => {
              const date = moment(comment.created_at);
              return (
                <article key={comment._id || commentId} className="container">
                  <div className="comment-vote-count">
                    <span className="far fa-thumbs-up"></span>
                    <p>{comment.votes || 0}</p>
                    <span className="far fa-thumbs-down"></span>
                  </div>
                  <div className="comment-article">
                    <p className="commentator">Posted by <Link to={`/users/${comment.created_by}`}>{comment.created_by || "northcoder"}</Link><span> - </span>{date.startOf('minute').fromNow()}</p>
                    <p className="comment-text">{comment.body || comment.comment}</p>
                    {comment.created_by === "northcoder" ? <button className="btn-delete-comment" onClick={(e) => this.removeNCComment(comment)}>Delete comment</button> : <button className="btn-delete-comment" onClick={()=>{ alert('You are not authorised to delete a comment posted by another user') }}>Delete comment</button>}
                  </div>
                </article>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Comments;