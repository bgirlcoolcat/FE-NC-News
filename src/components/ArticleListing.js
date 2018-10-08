import React from 'react';
import { Link } from 'react-router-dom';
import PT from 'prop-types';
import './ArticleListing.css';


const ArticleListing = (props) => {
  return (
    <div className="article-page-article">
      <Link to={`/articles/${props.id}/comments`}><h2><span className="opening-tag">{"<"}</span>{props.title}<span className="closing-tag"> /></span></h2></Link>
      <p style={{ color: '#595959' }}>By <Link to={`/users/${props.created_by}`} style={{ color: '#c1002e' }}>{props.created_by}</Link>
        <span> in </span>
        <Link to={`/topics/${props.belongs_to}/articles`} style={{ color: '#c1002e' }}>{props.belongs_to}</Link>
        <span className="far fa-comments"></span>
        <Link to={`/articles/${props.id}/comments`} style={{ color: '#c1002e' }}>Comments</Link>
      </p>
    </div>
  );
}

ArticleListing.propTypes = {
  id: PT.string.isRequired,
  created_by: PT.string.isRequired, 
  belongs_to: PT.string.isRequired, 
  title: PT.string.isRequired, 
};

export default ArticleListing;