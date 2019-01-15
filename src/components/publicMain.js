import React, { Component } from 'react';
import BookTypes from './bookTypes';
import Quotes from './quotes';
import BookLists from './bookLists';

class PublicMain extends Component {
  render() {
    return (
      <React.Fragment>
        <BookTypes />
        <Quotes />
        <BookLists />
      </React.Fragment>
    )
  }
}

export default PublicMain;
