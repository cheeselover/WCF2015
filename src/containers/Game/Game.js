import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded, load, join, leave, start, stop } from 'redux/modules/game';
import findWhere from 'lodash/collection/findWhere';
import { Participation } from 'components';

@connect(
  (state, props) => {
    const { games, participations, users } = state.entities;
    return {
      game: games[props.params.id],
      participations,
      users,
      user: state.auth.user
    };
  },
  {join, leave, start, stop}
)
export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object,
    user: PropTypes.object,
    participations: PropTypes.object,
    join: PropTypes.func,
    leave: PropTypes.func,
    start: PropTypes.func,
    end: PropTypes.func,
    users: PropTypes.object
  }

  static fetchData(getState, dispatch, location, params) {
    if (!isLoaded(getState(), params.id)) {
      return dispatch(load(params.id));
    }
  }

  action(name) {
    this.props[name](this.props.game.id);
  }

  renderJoinLeaveButton() {
    const { user, game, participations } = this.props;
    if (user) {
      const participation = findWhere(participations, {user: user.id, game: game.id});
      if (participation && participation.active) {
        return <button className="btn btn-danger" onClick={this.action.bind(this, 'leave')}>Leave Game</button>;
      } else if (participation && participation.userType === 'creator') {
        if (game.running) return <button className="btn btn-danger" onClick={this.action.bind(this, 'stop')}>End Game</button>;
        return <button className="btn btn-success" onClick={this.action.bind(this, 'start')}>Start Game</button>;
      }
      return <button className="btn btn-primary" onClick={this.action.bind(this, 'join')}>Join Game</button>;
    }
  }

  renderParticipants() {
    const { game, participations, users } = this.props;
    const participants = game.participations.map((id) => participations[id]);
    return participants.map((participation) => {
      const user = users[participation.user];
      return <Participation key={participation.id} participation={participation} user={user}/>;
    });
  }

  render() {
    const { game } = this.props;
    const { title, description, running } = game;
    return (
      <div className="container">
        <h1>{title} <small>{running ? 'Game is in progress' : 'Game has not yet started'}</small> {this.renderJoinLeaveButton()}</h1>
        <p>{description}</p>
        <ul>
          {this.renderParticipants()}
        </ul>
      </div>
    );
  }
}
