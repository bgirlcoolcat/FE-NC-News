export const fetchTopic = topic => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/topics/${topic}/articles`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`${topic} articles not found`);
  })
};

export const fetchOneArticle = articleId => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Article with id: ${articleId} not found`);
  })
};

export const fetchComments = articleId => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}/comments`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Comments not found for article id: ${articleId}`);
  })
};

export const deleteComment = commentId => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/comments/${commentId}`, {
    method: 'DELETE',
    mode: 'cors',
  })
  .catch(error => console.error('Error:', error))
};

export const fetchTopics = () => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/topics`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Topics not found");
  })
};

export const fetchArticles = () => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Articles not found");
  })
};

export const postComment = (articleId, comment) => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}/comments`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "comment": comment })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error ("Something went wrong with posting your comment");
  })
};

export const fetchUser = username => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/users/${username}`)
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    throw new Error(`User ${username} not found`);
  })
};

export const putArticleVoteUp = articleId => {
  return fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${articleId}?vote=up`, { 
    method: 'PUT'
  })
  .catch(error => console.error('Error:', error));
};

export const putArticleVoteDown = articleId => {
  return fetch(`http://northcoders-news-api.herokuapp.com/api/articles/${articleId}?vote=down`, { 
    method: 'PUT'
  })
  .catch(error => console.error('Error:', error));
};

export const putCommentVoteUp = commentId => {
  return fetch(`http://northcoders-news-api.herokuapp.com/api/comments/${commentId}?vote=up`, { 
    method: 'PUT'
  })
  .catch(error => console.error('Error:', error));
};

export const putCommentVoteDown = commentId => {
  return fetch(`http://northcoders-news-api.herokuapp.com/api/comments/${commentId}?vote=down`, { 
    method: 'PUT' 
  })
  .catch(error => console.error('Error:', error));
};