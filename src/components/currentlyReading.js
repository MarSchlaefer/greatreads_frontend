import React, { Component } from 'react';
import BookCard from './bookCard'

class CurrentlyReading extends Component {
  render() {
    return (
      <div className="currently-reading">
        <h1>current</h1>
        {this.renderContent()}
      </div>
    )
  }

  findCurrUserBooks = () => {
    let myBooks
    // debugger
    if (this.props.allBooks.length > 0) {
      myBooks = this.props.allBooks.filter(book => {
        return book.user_books.find(userbook => this.props.currUser.id === userbook.user_id && userbook.current)
      })
      return myBooks
    } else {
      myBooks = []
    }
    // console.log("after filter", myBooks);
    return myBooks
  }

  renderContent = () => {
    if (this.findCurrUserBooks().length > 0) {
      return this.findCurrUserBooks().map(book => {
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

} //end of class

export default CurrentlyReading;
