import React, { Component } from 'react';
import Album from './Components/Album/Album';
import Nav from './Components/Nav/Nav';
import './dave.css';


class Dave extends Component {
  render() {
    return (
      <div className = "Content_Container">
        {/* <Nav /> */}
        <Album />
      </div>
    );
  }
}

export default Dave;