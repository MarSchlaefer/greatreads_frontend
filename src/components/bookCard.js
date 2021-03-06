import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class BookCard extends Component {

  render() {
    return (
      <div className="book">
        <Link to={`/book/${this.props.bookData.id}`}>
          <div className="book-info">
            <h1>{this.props.bookData.title}</h1>
          
            <img src={this.props.bookData.thumbnail} alt=''/>
          </div>
        </Link>
        {this.makeDropDown()}
      </div>
    )
  }

  renderAuthors = () => {
    console.log(this.props.bookData.authors);
    // return this.props.bookData.authors.map(author => {
    //   return <p>{author}</p>
    // })
  }

  findUserBook = () => {
    if (this.props.bookData) {
      // console.log('BOOK DATA', this.props.bookData);
      // console.log('USER BOOKS', this.props.bookData.user_books);
      return this.props.bookData.user_books.find(userbook => this.props.currUserId === userbook.user_id)
    }
  }

  makeDropDown = () => {
    // console.log('userbook', this.findUserBook());
    if (this.findUserBook()) {
      if (this.findUserBook().current === true) {
        return (
          <select onChange={(e) => this.props.handleBookChange(e, this.findUserBook().id)}>
            <option defaultValue="current">Currently Reading</option>
            <option value="read">Read</option>
            <option value="want">Want to Read</option>
          </select>
      )
      } else if (this.findUserBook().read === true) {
        return (
          <select onChange={(e) => this.props.handleBookChange(e, this.findUserBook().id)}>
            <option value="current">Currently Reading</option>
            <option defaultValue="read">Read</option>
            <option value="want">Want to Read</option>
          </select>
      )
      } else if (this.findUserBook().want === true) {
        return (
          <select onChange={(e) => this.props.handleBookChange(e, this.findUserBook().id)}>
            <option value="current">Currently Reading</option>
            <option value="read">Read</option>
            <option defaultValue="want">Want to Read</option>
          </select>
      )
      }
    } else {
      return (
        <select onChange={(e) => this.props.createUserBook(e, this.props.bookData.id)}>
          <option defaultValue="not found">Not on a Bookshelf</option>
          <option value="current">Currently Reading</option>
          <option value="read">Read</option>
          <option value="want">Want to Read</option>
        </select>
      )
    }
  }

} //end of class

export default BookCard;
