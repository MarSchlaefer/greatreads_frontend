import React, { Component } from 'react';
import BookCard from './bookCard'

class Browse extends Component {
  render() {
    // console.log('browse props', this.props);
    return (
      <div className="browse">
        <h1>Browse</h1>
        <div className="book-list">
        {this.renderBooks()}
        </div>
      </div>
    )
  }

  renderBooks = () => {
    // console.log('in render books')
    // console.log(this.props.allBooks);
    if (this.props.allBooks.length > 0) {
      return this.props.allBooks.map(book => {
        // console.log(book);
        return <BookCard
                  bookData={book}
                  key={book.id}
                  currUserId={this.props.currUser.id}
                  handleBookClick={this.props.handleBookClick}
                  handleBookChange={this.props.handleBookChange}
                  />
      })
    } else {
      return "No books"
    }
  }
}

export default Browse;
