import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// class Home extends Component {
//   constructor(props) {
//     super(props);

//   }

//   render() {
//     return (
//       <div>
//         <h1>Status: {this.props.loggedInStatus}</h1>
//         <Registration />
//         <Link to="/dashboard" role="button">
//           Dashboard Test
//         </Link>
//       </div>
//     );
//   }
// }

// with the redirect for authentication

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>HomePage</h1>
      </div>
    );
  }
}

export default Home;
