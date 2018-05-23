import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ArticlePage.css';

const articles = [
  {
    id: "583412955905f02e4c8e6e18",
    title: "Running a Node App",
    created_by:	"tickle122",
    belongs_to:	"coding",
    votes: 4 
  },
  {
    id: "583412965905f02e4c8e6e19",
    title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
    created_by:	"tickle122",
    belongs_to:	"coding",
    votes: 5 
  },
  {
    id: "583412965905f02e4c8e6e1a",
    title: "22 Amazing open source React projects",
    created_by:	"grumpy19",
    belongs_to:	"coding",
    votes: 2
  },
  {
    id: "583412965905f02e4c8e6e1b",
    title: "Making sense of Redux",
    created_by: "grumpy19",
    belongs_to: "coding",
    votes: 8 
  },
  {
    id: "583412965905f02e4c8e6e1c",
    title: "Please stop worrying about Angular 3",
    created_by:	"happyamy2016",
    belongs_to:	"coding",
    votes: 10
  }
]

class ArticlePage extends Component {
  render () {
    return (
      <div>
        {
          articles.map((article, i) => {
            return (
              <ul className="article-page-ul" key={article.id}>
              <li>
                <div className="vote-count">
                  <span className="far fa-thumbs-up"></span>
                  <p>{article.votes}</p>
                  <span className="far fa-thumbs-down"></span>
                </div>
                <div className="article-page-article">
                  <Link to="/article"><a href=""><h2>{article.title}</h2></a></Link>
                  <p>By <a href="">{article.created_by}</a><span> in </span><a href="">{article.belongs_to}</a></p>
                </div>
              </li>
              </ul>
            );
          })
        }
      </div>
    );
  }
}


export default ArticlePage;