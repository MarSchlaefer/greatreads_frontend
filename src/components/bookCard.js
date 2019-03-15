import React, { Component } from 'react';

class BookCard extends Component {

  render() {
    return (
      <div className="book">
        <div className="book-info" onClick={() => this.props.handleBookClick(this.props.bookData.id)}>
          <h1>{this.props.bookData.title}</h1>
          {this.renderAuthors()}
          <img src={this.props.bookData.thumbnail} alt=''/>
        </div>
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
    // console.log(this.props.bookData.user_books);
    return this.props.bookData.user_books.find(userbook => this.props.currUserId === userbook.user_id)
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
        <select onChange={(e) => this.props.handleBookChange(e, this.findUserBook().id)}>
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
