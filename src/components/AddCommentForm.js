import React, { Component } from 'react';
import { postComment } from '../containers/api';
import PT from 'prop-types';
import Button from './Button';


class AddCommentForm extends Component {
  state = {
    comment: ""
  };

  handleCommentChange = event => {
    this.setState({
      comment: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.comment === "") return;

    this.props.addComment(this.state.comment);

    const articleId = this.props.articleId;
    const comment = this.state.comment;

    postComment(articleId, comment)
    .then(json => {
      console.log("Success:", json);
    })

    // This clears the input
    this.setState({
      comment: ""
    });
  }

  render () {
    const { comment } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="col-sm-10 py-1">
            <input 
              className="form-control" 
              type="text" 
              placeholder="Add a comment..."
              value={comment}
              onChange={this.handleCommentChange}
            />
          </div>
          <div className="col-sm-2 py-1">
            <Button btnClass="submit" type="submit"><span className="opening-tag-submit-btn">{"<"}</span>Add comment <span className="closing-tag-submit-btn">/></span></Button>
          </div>
        </div>
      </form>
    );
  }
}

AddCommentForm.propTypes = {
  addComment: PT.func.isRequired,
  articleId: PT.string.isRequired,
};

export default AddCommentForm;