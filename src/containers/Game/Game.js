import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded, load, join, leave } from 'redux/modules/game';
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
  {join, leave}
)
export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object,
    user: PropTypes.object,
    participations: PropTypes.object,
    join: PropTypes.func,
    leave: PropTypes.func,
    users: PropTypes.object
  }

  static fetchData(getState, dispatch, location, params) {
    if (!isLoaded(getState(), params.id)) {
      return dispatch(load(params.id));
    }
  }

  join() {
    this.props.join(this.props.game.id);
  }

  leave() {
    this.props.leave(this.props.game.id);
  }

  renderJoinLeaveButton() {
    const { user, game, participations } = this.props;
    if (user) {
      const participation = findWhere(participations, {user: user.id, game: game.id});
      if (participation && participation.active) {
        return <button className="btn btn-warning" onClick={::this.leave}>Leave Game</button>;
      }
      return <button className="btn btn-primary" onClick={::this.join}>Join Game</button>;
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
    return (
      <div className="container">
        <h1>{this.props.game.title} {this.renderJoinLeaveButton()}</h1>
        <p>{this.props.game.description}</p>
        <ul>
          {this.renderParticipants()}
        </ul>
      </div>
    );
  }
}
