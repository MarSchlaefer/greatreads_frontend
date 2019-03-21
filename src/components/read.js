import React, { Component } from 'react';
import BookCard from './bookCard'

class Read extends Component {
  render() {
    return (
      <div className={this.props.location === "bookshelf" ? "bookshelf" : "read"}>
        <h1>Read</h1>
        <div className={this.props.location === "bookshelf" ? "bookshelf-items" : this.props.location === "userHome" ? "userHome-read" : null}>
          {this.renderContent()}
        </div>
      </div>
    )
  }

  findReadUserBooks = () => {
    let myBooks
    // debugger
    if (this.props.allBooks.length > 0) {
      myBooks = this.props.allBooks.filter(book => {
        return book.user_books.find(userbook => this.props.currUser.id === userbook.user_id && userbook.read)
      })
      console.log('curr user is', this.props.currUser.id );
      return myBooks
    } else {
      myBooks = []
    }
    console.log("after filter", myBooks);
    return myBooks
  }

  renderContent = () => {
    if (this.findReadUserBooks().length > 0) {
      return this.findReadUserBooks().map(book => {
        return <BookCard
                key={book.id}
                bookData={book}
                currUserId={this.props.currUser.id}
                handleBookClick={this.props.handleBookClick}
                handleBookChange={this.props.handleBookChange}
                location={this.props.location}
              />
      })
    } else {
      return <p>No current books.</p>
    }
  }

}

export default Read;
