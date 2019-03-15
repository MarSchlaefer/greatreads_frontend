import React, { Component } from 'react';

class BookShow extends Component {

  render() {
    return (
      <div className="book-show-container">
        <div className="book-show-image">
          <img src={this.findBookObj().thumbnail} alt=''/>
        </div>
        <div className="book-show-info">
          <h1>{this.findBookObj().title}</h1>
        </div>
      </div>
    )
  }

  findBookObj = () => {
    return this.props.allBooks.find(book => book.id === this.props.currBookId)
  }
} //end of class

export default BookShow;
