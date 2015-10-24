import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object
  }

  render() {
    const { title, description } = this.props.game;
    return (
      <li>
        <Link to={`/games/${this.props.game.id}`}>
          <h3>{title}</h3>
          <p>{description}</p>
        </Link>
      </li>
    );
  }
}
