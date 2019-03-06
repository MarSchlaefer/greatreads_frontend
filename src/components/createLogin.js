import React, { Component } from 'react';
import BookTypes from './bookTypes';
import Quotes from './quotes';
import BookLists from './bookLists';

class CreateLogin extends Component {
  render() {
    return (
      <div className="signup-container">
      <h1>Create a New Account!</h1>
      <form >
        <label>
          Username:
        </label>
        <input type="text" name="username"/>
      <br />
        <label>
          Email:
        </label>
        <input type="text" name="email"/>
      <br />
        <label>
          Password:
        </label>
        <input type="password" name="password"/>
      <br />
        <label>
          Check Password:
        </label>
        <input type="password" name="check-password"/>
      <br />
        <input type="submit" value="Submit"/>
      </form>
      </div>
    )
  }
}

export default CreateLogin;
