import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import map from 'lodash/collection/map';
import { Game } from 'components';
import { loadAll } from 'redux/modules/game';

@connect(
  (state) => ({games: state.entities.games, user: state.auth.user})
)
export default class Games extends Component {
  static propTypes = {
    games: PropTypes.object,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    if (Object.keys(getState().entities.games).length < 5) {
      return dispatch(loadAll());
    }
  }

  renderGames() {
    return map(this.props.games, (game) => <Game key={game.id} game={game}/>);
  }

  render() {
    const style = require('./Games.scss');
    return (
      <div className={style.gamelist + ' container'}>
        <h1>Game List {this.props.user && <Link to="/games/create" className="btn btn-primary">Create</Link>}</h1>
        <ul className={style.games}>
          {this.renderGames()}
        </ul>
      </div>
    );
  }
}
