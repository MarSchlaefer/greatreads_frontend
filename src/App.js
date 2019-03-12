import React, { Component } from 'react';
import UserHome from './components/userHome'
import PublicHome from './components/publicHome'
import NavHead from './components/navHead'
import NavFoot from './components/navFoot'
import { Route, Switch, Redirect } from 'react-router-dom'
import Bookshelf from './components/bookshelf'
import Browse from './components/browse'
import Auth from './modules/auth'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      books: [],
      auth: Auth.isUserAuthenticated()
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className="App">
        <NavHead handleLogout={this.handleLogout} auth={this.state.auth}/>
        <div className="main">

            {this.renderContent()}

        </div>
        <NavFoot />
      </div>
    );
  }

  // renderContent = () => {
  //   console.log("Auth state at render", this.state.auth)
  //   if (!this.state.auth) {
  //     return <Route
  //             exact path="/"
  //             render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} books={this.state.books}/>}
  //           />
  //   } else {
  //     return <Route
  //             exact path="/" component={UserHome}
  //           />
  //   }
  // }

  renderContent = () => {
    if (this.state.auth) {
      return (
        <Switch>
          <Route exact path="/browse"
            render={(props) => <Browse {...props} allBooks={this.state.books}/>}
          />
          <Route exact path="/my-books"
            render={() => <Bookshelf/>}
          />
          <Route exact path="/home"
            render={() => <UserHome/>}
          />
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route
          exact path="/"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} books={this.state.books}/>}
          />
          <Route
          exact path="/browse"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} books={this.state.books}/>}
          />
          <Route
          exact path="/my-books"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} books={this.state.books}/>}
          />
          <Route
          exact path="/home"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} books={this.state.books}/>}
          />
        </Switch>
      )
    }
  }

  getBooks = () => {
    fetch('http://localhost:3000/api/v1/books')
      .then(res => res.json())
      .then(allBooks => this.setState({
        books: allBooks
      }, console.log(this.state.books)))
  }

  handleLogin = (e, data) => {
    e.preventDefault()
    // console.log("in handleLogin");
    // this.setState({
    //   login: 'loggedin'
    // })
    fetch("http://localhost:3000/api/v1/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: data
      })
    }).then(res => res.json())
    .then(currUser => {
      console.log("This is current User", currUser)
      Auth.authenticateToken(currUser.jwt)
      this.setState({
        auth: Auth.isUserAuthenticated()
      }, console.log(this.state.auth))
    }).catch(error => console.log(error))
  }

  handleSubmit = (e, data) => {
    e.preventDefault()
    console.log(data);
    fetch("http://localhost:3000/api/v1/users", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        user: data,
      })
    }).then (res => res.json())
    .then (newUser => {
      console.log(newUser)
      Auth.authenticateToken(newUser.jwt)
      this.setState({
        auth: Auth.isUserAuthenticated()
      }, console.log(this.state.auth))
    }).catch (error => console.log(error))
  }

  handleLogout = () => {
    fetch("http://localhost:3000/api/v1/logout", {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization':`Token ${Auth.getToken()}`
      }
    }).then(res => {
      Auth.deauthenticateToken()
      this.setState({
        auth: Auth.isUserAuthenticated()
      })
    }).catch(error => console.log(error))
  }
} //end of class

export default App;
