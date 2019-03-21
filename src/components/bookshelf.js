import React, { Component } from 'react';
import CurrentlyReading from './currentlyReading';
import WantToRead from './wantToRead';
import Read from './read';

class Bookshelf extends Component {
  render() {
    console.log('my books props', this.props);
    return (
      <div className="bookshelves">
        <h1>bookshelf</h1>
        <CurrentlyReading
          allBooks={this.props.allBooks}
          currUser={this.props.currUser}
          handleBookClick={this.props.handleBookClick}
          handleBookChange={this.props.handleBookChange}
          createUserBook={this.props.createUserBook}
          location="bookshelf"
          />
        <Read
          allBooks={this.props.allBooks}
          currUser={this.props.currUser}
          handleBookClick={this.props.handleBookClick}
          handleBookChange={this.props.handleBookChange}
          createUserBook={this.props.createUserBook}
          location="bookshelf"
          />
        <WantToRead
          allBooks={this.props.allBooks}
          currUser={this.props.currUser}
          handleBookClick={this.props.handleBookClick}
          handleBookChange={this.props.handleBookChange}
          createUserBook={this.props.createUserBook}
          location="bookshelf"
          />
      </div>
    )
  }
}

export default Bookshelf;
