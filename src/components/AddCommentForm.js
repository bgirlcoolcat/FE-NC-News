import React, { Component } from 'react';
// import PT from 'prop-types';

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
    // console.log('CommentForm value: ' + this.state.comment);
    this.props.addComment(this.state.comment)
    event.preventDefault();

    // This clears the input
    this.setState({
      comment: ""
    });
  }

  render () {
    const { comment } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          placeholder=" Add a comment..."
          value={comment}
          onChange={this.handleCommentChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddCommentForm;