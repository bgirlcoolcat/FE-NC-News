import React, { Component } from 'react';


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

    // console.log('CommentForm value: ' + this.state.comment);
    this.props.addComment(this.state.comment);

    fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${this.props.articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        "comment": this.state.comment
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error ('Something went wrong with your fetch');
      }
    }).then((json) => {
      console.log(json);
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
            <button className="btn btn-danger" type="submit"><span className="opening-tag-submit-btn">{"<"}</span>Add comment <span className="closing-tag-submit-btn">/></span></button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddCommentForm;