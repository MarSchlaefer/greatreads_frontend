import React, { Component } from 'react';
import BookTypes from './bookTypes';
import Quotes from './quotes';
import BookLists from './bookLists';

class PublicMain extends Component {
  render() {
    return (
      <React.Fragment>
        <BookTypes books={this.props.books}/>
        <Quotes books={this.props.books}/>
        <BookLists books={this.props.books}/>
      </React.Fragment>
    )
  }
}

export default PublicMain;
