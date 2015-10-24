import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Games extends Component {
  render() {
    return (
      <div className="container">
        <h1>Game List <Link to="/games/create" className="btn btn-primare">Create</Link></h1>
      </div>
    );
  }
}
