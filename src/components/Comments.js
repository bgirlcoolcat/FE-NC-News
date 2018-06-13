import React, { Component } from 'react';
import { fetchComments, deleteComment } from '../containers/api';
import Loading from './Loading';
import AddCommentsForm from './AddCommentForm';
// import uuid from 'uuid';
import Comment from './Comment';
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

    this.setState({ comments: newComments });
  };

  handleDeleteCommentEvent = commentId => {
    // console.log('Remove NCComment:', commentId);

      const updatedComments = this.state.comments.filter(item => {
        return item._id !== commentId;
      })

      this.setState({comments: updatedComments})

      deleteComment(commentId)

  };

  render () {
    const { comments, loading, articleId } = this.state;
    return (
      <div>
        <div className="comments">
          <h4>Comments</h4>
          <AddCommentsForm addComment={this.addComment} articleId={articleId} />
        </div>  

          { loading ? <Loading /> : 
            comments.map((comment, commentId) => {
              return (
                // <article key={comment._id || commentId} className="container">
                  <Comment 
                  key={comment._id || commentId}
                  id={comment._id || commentId}
                  created_at={comment.created_at}
                  created_by={comment.created_by}
                  votes={comment.votes}
                  body={comment.body || comment.comment}
                  onDeleteComment={this.handleDeleteCommentEvent}
                />
                // </article>
              )
            })
          }
        </div>
    );
  }
}

export default Comments;