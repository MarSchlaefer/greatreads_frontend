import React, { Component } from 'react';
import BookCard from './bookCard'

class CurrentlyReading extends Component {
  render() {
    return (
      <div className={this.props.location === "bookshelf" ? "bookshelf" : "currently-reading"}>
        <h1>Currently Reading</h1>
        <div className={this.props.location === "bookshelf" ? "bookshelf-items" : this.props.location === "userHome" ? "userHome-current" : null}>
          {this.renderContent()}
        </div>
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
      return <p>No current books.</p>
    }
  }

} //end of class

export default CurrentlyReading;
