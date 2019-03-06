import React, { Component } from 'react';

class BookCard extends Component {

  render() {
    return (
      <div className="book">
        <h1>{this.props.bookData.title}</h1>
        {this.renderAuthors()}
        <img src={this.props.bookData.thumbnail} alt=''/>
      </div>
    )
  }

  renderAuthors = () => {
    console.log(this.props.bookData.authors);
    // return this.props.bookData.authors.map(author => {
    //   return <p>{author}</p>
    // })
  }
}

export default BookCard;
