import React, { Component } from 'react';
import BookCard from './bookCard'

class WantToRead extends Component {
  render() {
    return (
      <div className="want-to-read">
        <h1>want</h1>
        {this.renderContent()}
      </div>
    )
  }

  findWantUserBooks = () => {
    let myBooks
    // debugger
    if (this.props.allBooks.length > 0) {
      myBooks = this.props.allBooks.filter(book => {
        return book.user_books.find(userbook => this.props.currUser.id === userbook.user_id && userbook.want)
      })
      return myBooks
    } else {
      myBooks = []
    }
    console.log("after filter", myBooks);
    return myBooks
  }

  renderContent = () => {
    if (this.findWantUserBooks().length > 0) {
      return this.findWantUserBooks().map(book => {
        return <BookCard
                  key={book.id}
                  bookData={book}
                  currUserId={this.props.currUser.id}
                  handleBookClick={this.props.handleBookClick}
                  handleBookChange={this.props.handleBookChange}
                />
      })
    } else {
      return <h1>No current books.</h1>
    }
  }
}

export default WantToRead;
