export default class AuthService {

  static getLogin() {
    return fetch('http://localhost:5500/api/auth/login')
      .then(res => res.json())
      .catch(error => this.handleError)
  }

  static getSignup(auth) {
    return fetch('http://localhost:5500/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .catch(error => this.handleError)
  }

  static handleError(error) {
    console.log(error);
  }
};