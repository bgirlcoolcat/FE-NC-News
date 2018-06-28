import React, { Component } from 'react';
import Loading from './Loading';
import Comment from './Comment';
import { fetchComments, deleteComment } from '../containers/api';
import AddCommentsForm from './AddCommentForm';
import './Comments.css';


class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    articleId: this.props.match.params.articleId,
    upVoted: false,
    downVoted: false,
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

  handleUpVoteEvent = commentId => {
    const updatedVotes = this.state.comments.map(comment => {
      if (comment._id === commentId) {
        return Object.assign({}, comment, {
          votes: comment.votes + 1
        });
      } else {
        return comment;
      }
    });

    this.setState({
      comments: updatedVotes
    });

    fetch(`http://northcoders-news-api.herokuapp.com/api/comments/${commentId}?vote=up`, { 
      method: 'PUT'
    })
    .catch(error => console.error('Error:', error));
  };

  handleDownVoteEvent = commentId => {
    const updatedVotes = this.state.comments.map(comment => {
      if (comment._id === commentId) {
        return Object.assign({}, comment, {
          votes: comment.votes - 1
        });
      } else {
        return comment;
      }
    });

    this.setState({
      comments: updatedVotes
    });

    fetch(`http://northcoders-news-api.herokuapp.com/api/comments/${commentId}?vote=down`, { 
      method: 'PUT' 
    })
    .catch(error => console.error('Error:', error));
  };

  render () {
    const { comments, loading, articleId } = this.state;
    return (
      <div className="comments">
        <div className="container">
        <h4 className="comments-header pt-3"><span className="opening-tag">{"<"}</span>Comments <span className="closing-tag">/></span></h4>
          <AddCommentsForm addComment={this.addComment} articleId={articleId} />

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
                    onUpVote={this.handleUpVoteEvent}
                    onDownVote={this.handleDownVoteEvent}
                  />
                // </article>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Comments;