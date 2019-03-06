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
        <form onSubmit={this.props.handleLogin}>
          <label>
            Email:
          </label>
          <input type="text" name="email" onChange={this.inputChange} value={this.state.email}/>
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

  inputChange = (event) => {
    console.log(this.state)
    this.setState({
      [event.target.name]: event.target.value
    })
  }


} //end of class

export default LoginMain;
