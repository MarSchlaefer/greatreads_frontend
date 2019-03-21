import React, { Component } from 'react';
import UserHome from './components/userHome'
import PublicHome from './components/publicHome'
import NavHead from './components/navHead'
import { Route, Switch } from 'react-router-dom'
import Bookshelf from './components/bookshelf'
import Browse from './components/browse'
import Auth from './modules/auth'
import BookShow from './components/bookShow'
import Profile from './components/profile'
import NotFound from './components/notFound'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      auth: Auth.isUserAuthenticated(),
      currUser: {},
      books: []
    }
  }

  componentWillMount() {
    localStorage.getItem("currUser") && this.setState({
      currUser: JSON.parse(localStorage.getItem("currUser"))
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="logo">greatreads</h1>
          <input type="checkbox" className="nav-toggle"></input>
          <NavHead handleLogout={this.handleLogout} auth={this.state.auth} />
          <label for="nav-toggle" className="nav-toggle-label">
            <span></span>
          </label>
        </header>
        <div className="main">
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent = () => {
    if (this.state.auth) {
      return (
        <Switch>
          <Route exact path="/profile"
            render={(props) => <Profile
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
          <Route exact path="/book/:id"
            render={(props) => {
              console.log(props);
              let currBookId = parseInt(props.location.pathname.replace('/book/', ''))
              return (<BookShow
                        allBooks={this.state.books}
                        currBook={this.state.books.find(book => book.id === currBookId)}
                        currUser={this.state.currUser.user}
                        handleBookChange={this.handleBookChange}
                        createUserBook={this.createUserBook}
                        />)}
            }
          />
          <Route exact path="/browse"
            render={(props) => <Browse
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
          <Route exact path="/my-books"
            render={(props) => <Bookshelf
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
          <Route exact path="/home"
            render={(props) => <UserHome
                            allBooks={this.state.books}
                            currUser={this.state.currUser.user}
                            handleBookClick={this.handleBookClick}
                            handleBookChange={this.handleBookChange}
                            createUserBook={this.createUserBook}
                            />}
          />
          <Route component={ NotFound } />
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route exact path="/book/:id"
          render={(props) => <PublicHome {...props} handleLogin={this.handleLogin} />}
          />
          <Route exact path="/profile"
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
      localStorage.setItem("currUser", JSON.stringify(currUser))
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
    Auth.deauthenticateToken()
    localStorage.removeItem("currUser")
    this.setState({
      auth: Auth.isUserAuthenticated()
    })
  }

  handleBookChange = (e, id) => {
    console.log('userbook event', e.target.value);
    let bodyObj
    if (e.target.value === 'current') {
      bodyObj = {
        user_book: {
          current: true,
          read: false,
          want: false,
        }
      }
    } else if (e.target.value === 'read') {
      bodyObj = {
        user_book: {
          current: false,
          read: true,
          want: false,
        }
      }
    } else if (e.target.value === 'want') {
      bodyObj = {
        user_book: {
          current: false,
          read: false,
          want: true,
        }
      }
    }

    console.log('THIS IS BODYOBJ', bodyObj);

    fetch(`http://localhost:3000/api/v1/user_books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    }).then(res => res.json())
    .then(editedUserBook => {
      console.log(editedUserBook)
      this.getBooks()
      // let editedArray = [...this.state.books].map(book => {
      //   return book.user_books.forEach(userBook => {
      //     if (userBook.id === id) {
      //       return editedUserBook
      //     } else {
      //       return userBook
      //     }
      //   })
      // })
      // this.setState({
      //   books: editedArray
      // }, () => console.log('THIS IS STATE', this.state))
    }).catch(error => console.log(error))
  }

  createUserBook = (e, bookId) => {
    console.log('in create userbook')
    let bodyObj
    if (e.target.value === 'current') {
      bodyObj = {
        book_id: bookId,
        user_id: this.state.currUser.user.id,
        current: true,
        read: false,
        want: false
      }
    } else if (e.target.value === 'read') {
      bodyObj = {
        book_id: bookId,
        user_id: this.state.currUser.user.id,
        current: false,
        read: true,
        want: false
      }
    } else if (e.target.value === 'Want to Read') {
      bodyObj = {
        book_id: bookId,
        user_id: this.state.currUser.user.id,
        current: false,
        read: false,
        want: true
      }
    }
    fetch('http://localhost:3000/api/v1/user_books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    }).then(res => res.json())
    .then(newUserBook => {
      console.log(newUserBook)
      this.getBooks()
      // let newBooksArray = {...this.state.books}.map(book => {
      //   if (book.id === bookId) {
      //     book.user_books.push(newUserBook)
      //     return book
      //   } else {
      //     return book
      //   }
      // })
      // this.setState({
      //   books: newBooksArray
      // })
    }).catch(error => console.log(error))
  }


} //end of class

export default App;
