import React, { Component } from 'react';

class LoginMain extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login!</h1>
        <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
          <label>
            Username:
          </label>
          <input type="text" name="username" onChange={this.inputChange} value={this.state.username}/>
        <br />
          <label>
            Password:
          </label>
          <input type="password" name="password" onChange={this.inputChange} value={this.state.password}/>
        <br />
          <input type="submit" value="Submit"/>
        </form>

      </div>
    )
  }

  inputChange = (e) => {
    const name = e.target.name
    const val = e.target.value
    console.log(name);
    console.log(val);
    this.setState({
      [name]: val,
    })
  }


} //end of class

export default LoginMain;
