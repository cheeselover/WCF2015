import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded, load } from 'redux/modules/game';

@connect(
  (state, props) => ({game: state.entities.games[props.params.id]})
)
export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object
  }

  static fetchData(getState, dispatch, location, params) {
    if (!isLoaded(getState(), params.id)) {
      return dispatch(load(params.id));
    }
  }

  render() {
    return (
      <div className="container">
        <h1>{this.props.game.title}</h1>
        <p>{this.props.game.description}</p>
      </div>
    );
  }
}
