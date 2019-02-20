import React, { Component } from 'react';

class BookTypes extends Component {
  render() {
    return (
      <div className="book-types">
        <h1>Search by Book Type</h1>
          <p><span>Fiction</span><span> | </span><span>NonFiction</span><span> | </span><span>Science</span><span> | </span><span>Mystery</span><span> | </span><span>Comedy</span></p>
          {this.makeBook()}
      </div>
    )
  }

  makeBook = () => {
    return this.props.books.forEach(book => {
      <img src="${book.thumbnail}" />
    })
  }
} //end class

export default BookTypes;
