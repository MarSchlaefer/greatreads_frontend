import React, { Component } from 'react';
import UserHome from './userHome'
import PublicHome from './publicHome'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      login: 'loggedout'
    }
  }

  render() {
    return (
      <div className="App">
        <header>greatreads</header>
        <h1>{this.renderContent()}</h1>
        <footer>footer</footer>
      </div>
    );
  }

  renderContent = () => {
    if (this.state.login === 'loggedout') {
      return <PublicHome />
    } else if (this.state.login === 'loggedin') {
      return <UserHome />
    }
  }
}

export default App;
