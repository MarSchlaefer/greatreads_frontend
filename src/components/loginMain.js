import React, { Component } from 'react';

class LoginMain extends Component {
  render() {
    return (
      <div className="login-container">
        <h1>Login!</h1>
        <form>
          <label>
            Email:
          </label>
          <input type="text" name="email"/>
        <br />
          <label>
            Password:
          </label>
          <input type="text" name="Password"/>
        <br />
          <input type="submit" value="Submit"/>
        </form>
        <p>Create a New Account</p>
      </div>
    )
  }
}

export default LoginMain;
