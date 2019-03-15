import React, { Component } from 'react';
import UserHome from './components/userHome'
import PublicHome from './components/publicHome'
import NavHead from './components/navHead'
import NavFoot from './components/navFoot'
import { Route, Switch } from 'react-router-dom'
import Bookshelf from './components/bookshelf'
import Browse from './components/browse'
import Auth from './modules/auth'
import BookShow from './components/bookShow'
import Profile from './components/profile'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      auth: Auth.isUserAuthenticated(),
      currUser: {},
      books: [],
      bookClicked: false,
      currBookId: null
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className="App">
        <NavHead handleLogout={this.handleLogout} auth={this.state.auth} />
        <div className="main">
          {this.renderContent()}
        </div>
        <NavFoot />
      </div>
    );
  }

  renderContent = () => {
    if (this.state.auth && this.state.bookClicked) {
      return (
        <React.Fragment>
          <BookShow
            allBooks={this.state.books}
            currBookId={this.state.currBookId}
            currUser={this.state.currUser.user}
          />
        </React.Fragment>
      )
    } else if (this.state.auth && !this.state.bookClicked) {
      return (
        <Switch>
          <Route exact path="/profile"
            render={() => <Profile
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
          <Route exact path="/browse"
            render={() => <Browse
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
          <Route exact path="/my-books"
            render={() => <Bookshelf
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
          <Route exact path="/home"
            render={() => <UserHome
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route exact path={`/book/${this.state.currBook}`}
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} />}
          />
          <Route
          exact path="/"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} />}
          />
          <Route
          exact path="/browse"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin}/>}
          />
          <Route
          exact path="/my-books"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin}/>}
          />
          <Route
          exact path="/home"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin}/>}
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
      }, () => console.log("all the books", this.state.books))
      )
  }

  handleLogin = (e, data) => {
    e.preventDefault()
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
        auth: Auth.isUserAuthenticated(),
        currUser: currUser
      }, () => console.log(this.state.auth, this.state.currUser))
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

  handleBookClick = (id) => {
    console.log('in handle book click', id);
    this.setState({
      bookClicked: true,
      currBookId: id
    }, () => console.log(this.state))
  }

  handleBookChange = (e, id) => {
    // console.log('userbook id', id);
    // console.log('userbook event', e.target.value);
    let bodyObj
    if (e.target.value === 'Currently Reading') {
      bodyObj = {
        user_book: {
          current: true,
          read: false,
          want: false,
        }
      }
    } else if (e.target.value === 'Read') {
      bodyObj = {
        user_book: {
          current: false,
          read: true,
          want: false,
        }
      }
    } else if (e.target.value === 'Want to Read') {
      bodyObj = {
        user_book: {
          current: false,
          read: false,
          want: true,
        }
      }
    }
    fetch(`http://localhost:3000/api/v1/user_books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    }).then(res => res.json())
    .then(editedUserBook => {
      console.log(editedUserBook)
    })
  }

  createUserBook = (e) => {
    console.log('in create userbook')
  }


} //end of class

export default App;
