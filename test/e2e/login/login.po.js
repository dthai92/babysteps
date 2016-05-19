var LoginPage = function() {
  this.usernameInput = element(by.model('login.username'));
  this.passwordInput = element(by.model('login.password'));

  this.get = function() {
    browser.get('http://localhost:8080/#/login');
  }

  this.setUsername = function(name) {
    this.usernameInput = sendKeys(name);
  }

  this.setPassword = function(pw) {
    this.usernameInput = sendKeys(pw);
  }
}
