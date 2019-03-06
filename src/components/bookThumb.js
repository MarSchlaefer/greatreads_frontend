import React, { Component } from 'react'

export default class BookThumb extends Component {

  render() {
    return (
      <div>
        <img src={this.props.currBook.thumbnail} alt= '' />
      </div>
    )
  }

} //end of class
