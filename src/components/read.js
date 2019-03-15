import React, { Component } from 'react';
import BookCard from './bookCard'

class Read extends Component {
  render() {
    return (
      <div className="read">
        <h1>read</h1>
        {this.renderContent()}
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
              />
      })
    } else {
      return <h1>No current books.</h1>
    }
  }

}

export default Read;
