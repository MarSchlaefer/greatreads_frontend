import React, { Component } from 'react';
import Search from './search'
import BookCard from './bookCard'

class Browse extends Component {

  constructor() {
    super()
    this.state = {
      currSearch: null,
      filteredBooks: []
    }
  }

  render() {
    // console.log('browse props', this.props);
    return (
      <div className="browse">
        <div className="title-search">
          <h1>Browse</h1>
          <Search handleSearch={this.handleSearch}/>
        </div>
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
                  createUserBook={this.props.createUserBook}
                  />
      })
    } else {
      return "No books"
    }
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.setState({
      currSearch: this.state.value
    }, this.filterBooks())
  }

  filterBooks = () => {
    let newArray = this.props.allBooks.filter(book => book.title.includes(this.state.currSearch))
    this.setState({
      filteredBooks: newArray
    })
  }

} //end of class

export default Browse;
