export default class PostService {

  static getPosts() {
    return fetch('http://localhost:5500/api/posts/')
      .then(res => res.json())
      .catch(error => this.handleError)
  }

  static handleError(error) {
    console.log(error);
  }
};