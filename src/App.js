import React, { Component } from 'react';
import UserHome from './components/userHome'
import PublicHome from './components/publicHome'
import NavHead from './components/navHead'
import NavFoot from './components/navFoot'
import { Route, Switch } from 'react-router-dom'
import Bookshelf from './components/bookshelf'
import Browse from './components/browse'
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
        <NavHead />
        <div className="main">
          <Switch>
            {this.renderContent()}
            <Route exact path="/my-books" component={Bookshelf} />
            <Route exact path="/browse" component={Browse} />
          </Switch>
        </div>
        <NavFoot />
      </div>
    );
  }

  renderContent = () => {
    console.log(this.state.login)
    if (this.state.login === 'loggedout') {
      return <Route
              exact path="/"
              render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} books={this.state.books}/>}
            />
    } else if (this.state.login === 'loggedin') {
      return <Route
              exact path="/" component={UserHome}
            />
    }
  }

  getBooks = () => {
    fetch('http://localhost:3000/api/v1/books')
      .then(res => res.json())
      .then(allBooks => this.setState({
        books: allBooks
      }, console.log(this.state.books)))
  }

  handleLogin = (e) => {
    e.preventDefault()
    // console.log("in handleLogin");
    this.setState({
      login: 'loggedin'
    })
  }
} //end of class

export default App;
