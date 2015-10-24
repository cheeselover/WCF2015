import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(
  (state) => ({games: state.entities.games})
)
export default class Games extends Component {
  static propTypes = {
    games: PropTypes.object
  }

  render() {
    return (
      <div className="container">
        <h1>Game List <Link to="/games/create" className="btn btn-primary">Create</Link></h1>
      </div>
    );
  }
}
