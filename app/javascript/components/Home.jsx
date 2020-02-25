import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <button type="button" className="btn btn-primary">
          Primary
        </button>
      </div>
    );
  }
}

export default Home;
