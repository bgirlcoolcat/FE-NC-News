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