import React from 'react';
import ArticlesPage from './ArticlesPage';

const HomePage = () => {
  return (
    <div className="container pl-md-1">
      <div className="row">
        <div className="col-sm-12">
          <h5 style={{ padding: '1.2rem 0' }}><span className="opening-tag">{"<"}</span>Trending now - our 10 most popular articles <span className="closing-tag">/></span></h5>
          <ArticlesPage />
        </div>
      </div>
    </div>
  );
}

export default HomePage;