export const getTopic = topic => {
  return fetch(`https://northcoders-news-api.herokuapp.com/api/topics/${topic}/articles`)
  .then(
    res => {
      // console.log(res);
      if(res.status === 404) {
        // throw new Error('Sorry. User not found')
        // return Promise.reject(new Error('Sorry. User not found'));
        return Promise.reject(new Error(`${topic} articles not found`));
      }
      return res.json();
    }
  )
};