import React, { Component } from 'react';

class BookShow extends Component {

  render() {
    return (
      <div className="book-show-container">
        <div className="book-show-image">
          <img src={this.props.currBook.thumbnail} alt=''/>
        </div>
        <div className="book-show-info">
          <h1>{this.props.currBook.title}</h1>
        </div>
          {this.makeDropDown()}
      </div>
    )
  }

  findUserBook = () => {
    // console.log(this.props.bookData.user_books);
    return this.props.currBook.user_books.find(userbook => this.props.currUserId === userbook.user_id)
  }

  makeDropDown = () => {
    console.log('userbook', this.findUserBook());
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
        <select onChange={(e) => this.props.createUserBook(e)}>
          <option defaultValue="not found">Not on a Bookshelf</option>
          <option value="current">Currently Reading</option>
          <option value="read">Read</option>
          <option value="want">Want to Read</option>
        </select>
      )
    }
  }

} //end of class

export default BookShow;
