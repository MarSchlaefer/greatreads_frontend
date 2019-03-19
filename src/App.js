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
        <NavHead handleLogout={this.handleLogout} auth={this.state.auth} />
          <div className="main">
            {this.renderContent()}
          </div>
        <NavFoot />
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

  // handleBookClick = (id) => {
  //   console.log('in handle book click', id);
  //   this.setState({
  //     bookClicked: true,
  //     currBookId: id
  //   }, () => console.log(this.state))
  // }

  handleBookChange = (e, id) => {
    // console.log('userbook id', id);
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
    } else if (e.target.value === 'Want to Read') {
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
      let editedArray = [...this.state.books].map(book => {
        return book.user_books.forEach(userBook => {
          if (userBook.id === id) {
            return editedUserBook
          } else {
            return userBook
          }
        })
      })
      this.setState({
        books: editedArray
      }, () => console.log('THIS IS STATE', this.state))
    }).catch(error => console.log(error))
  }

  createUserBook = (e, bookId) => {
    console.log('in create userbook')
    let bodyObj
    if (e.target.value === 'current') {
      bodyObj = {

          book_id: bookId,
          user_id: this.state.currUser.id,
          current: true,
          read: false,
          want: false,

      }
    } else if (e.target.value === 'read') {
      bodyObj = {

          book_id: bookId,
          user_id: this.state.currUser.id,
          current: false,
          read: true,
          want: false,

      }
    } else if (e.target.value === 'Want to Read') {
      bodyObj = {
          book_id: bookId,
          user_id: this.state.currUser.id,
          current: false,
          read: false,
          want: true,
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
      let booksArray = [...this.state.books]
      let newBooksArray = booksArray.map(book => {
        if (book.id === bookId) {
          book.user_books.push(newUserBook)
          return book
        } else {
          return book
        }
      })
      this.setState({
        books: newBooksArray
      })
    }).catch(error => console.log(error))
  }


} //end of class

export default App;
