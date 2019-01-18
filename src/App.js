import React, { Component } from 'react';
import UserHome from './components/userHome'
import PublicHome from './components/publicHome'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      books: [],
      login: 'loggedout'
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className="App">
        <header>greatreads</header>
        <div className="main">
          {this.renderContent()}
        </div>
        <footer>footer</footer>
      </div>
    );
  }

  renderContent = () => {
    if (this.state.login === 'loggedout') {
      return <PublicHome handlleLogin={this.handlleLogin}/>
    } else if (this.state.login === 'loggedin') {
      return <UserHome />
    }
  }

  getBooks = () => {
    fetch('')
  }

  handlleLogin = () => {
    this.setState({
      login: 'loggedin'
    })
  }
}

export default App;
