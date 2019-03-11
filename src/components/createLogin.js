import React, { Component } from 'react';
import BookTypes from './bookTypes';
import Quotes from './quotes';
import BookLists from './bookLists';

class CreateLogin extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    return (
      <div className="signup-container">
      <h1>Create a New Account!</h1>
      <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
        <label>
          Username:
        </label>
        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
      <br />
        <label>
          Password:
        </label>
        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
      <br />
        <input type="submit" value="Submit"/>
      </form>
      </div>
    )
  }

  handleChange = (e) => {
    const name = e.target.name
    const val = e.target.value
    console.log(name);
    console.log(val);
    this.setState({
      [name]: val,
    })
  }
}

export default CreateLogin;
