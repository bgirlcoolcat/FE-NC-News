import React, { Component } from 'react';
import Loading from './Loading';
import Comment from './Comment';
import { fetchComments, deleteComment, putCommentVoteUp, putCommentVoteDown } from '../containers/api';
import AddCommentForm from './AddCommentForm';
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
    const { articleId } = this.props.match.params;
    fetchComments(articleId)
    .then(body => {
      this.setState({
        comments: body.comments, 
        loading: false
      })
    });
  }

  addComment = comment => {
    const newComments = this.state.comments.concat([comment]);

    this.setState({ comments: newComments });
  };

  handleDeleteCommentEvent = commentId => {
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

    putCommentVoteUp(commentId)
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

    putCommentVoteDown(commentId)
  };

  render () {
    const { comments, loading, articleId } = this.state;
    return (
      <div className="comments">
        <div className="container pl-md-1">
        <h4 className="comments-header pt-3"><span className="opening-tag">{"<"}</span>Comments <span className="closing-tag">/></span></h4>
          <AddCommentForm addComment={this.addComment} articleId={articleId} />

          { loading ? <Loading /> :
            comments.map((comment, commentId) => {
              return (
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
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Comments;