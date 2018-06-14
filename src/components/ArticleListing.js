import React from 'react';
import { Link } from 'react-router-dom';



const ArticleListing = (props) => {
  return (
    <ul className="article-page-ul">
      <li>
        <div className="vote-count">
          <span className="far fa-thumbs-up"></span>
          <p>{props.votes}</p>
          <span className="far fa-thumbs-down"></span>
        </div>
        <div className="article-page-article">
          <Link to={`/articles/${props.id}/comments`}><h2>{props.title}</h2></Link>
          <p>By 
            <Link to={`/users/${props.created_by}`}> {props.created_by}</Link>
            <span> in </span>
            <Link to={`/topics/${props.belongs_to}/articles`}>{props.belongs_to}</Link>
            <span className="far fa-comments"></span>
            <Link to={`/articles/${props.id}/comments`}>{props.comments} comments</Link>
          </p>
        </div>
      </li>
    </ul>
  );
}

export default ArticleListing;