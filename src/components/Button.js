import React from 'react';
import PT from 'prop-types';


// Have a look up table for class of button
const btnClasses = {
  "vote": "btn-vote",
  "voted": "btn-voted",
  "comment-vote": "btn-vote-comment",
  "comment-voted": "btn-voted-comment",
  "submit": "btn btn-danger",
  "delete-comment": "btn btn-outline-secondary btn-sm",
};

const Button = props => {
  return (
    <button className={`${btnClasses[props.btnClass]}`} onClick={props.onClick} disabled={props.isDisabled}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PT.any.isRequired,
  onClick: PT.func,
  btnClass: PT.string.isRequired,
  isDisabled: PT.bool,
};

export default Button;