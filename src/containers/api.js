export const fetchTopic = topic => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/topics/${topic}/articles`)
  .then(res => {
      if(res.status === 404) {
        return Promise.reject(new Error(`${topic} articles not found`));
      }
      return res.json();
    })
};

export const fetchOneArticle = articleId => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}`)
    .then(res => {
      return res.json();
    });
};

export const fetchComments = articleId => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}/comments`)
    .then(res => {
      return res.json();
    });
};

export const deleteComment = commentId => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/comments/${commentId}`, {
    method: 'DELETE',
    mode: 'cors',
  })
  .then(res => res)
  .catch(err => err);
};

export const fetchTopics = () => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/topics`)
  .then(res => {
    if(res.status === 404) {
      return Promise.reject(new Error("Topics not found"));
    }
    return res.json();
  })
};

export const fetchArticles = () => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles`)
  .then(res => {
    console.log(res);
    if(res.status === 404) {
      return Promise.reject(new Error("Articles not found"));
    }
    return res.json();
  })
};

export const postComment = (articleId, comment) => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}/comments`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "comment": comment })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error ("Something went wrong with your fetch");
    }
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