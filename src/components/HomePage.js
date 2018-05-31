import React from 'react';
import ArticlesPage from './ArticlesPage';

const HomePage = () => {
  return (
    <div>
      <h5 style={{ padding: '20px 0 20px 56px' }}>Trending now - our 10 most popular articles</h5>
      <ArticlesPage />
    </div>
  );
}

export default HomePage;