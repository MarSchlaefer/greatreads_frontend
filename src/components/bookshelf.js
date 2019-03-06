import React, { Component } from 'react';
import CurrentlyReading from './currentlyReading';
import WantToRead from './wantToRead';
import Read from './read';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelves">
        <h1>bookshelf</h1>
        <CurrentlyReading />
        <Read />
        <WantToRead />
      </div>
    )
  }
}

export default Bookshelf;
