import React, { Component, PropTypes } from 'react';

export default class Participation extends Component {
  static propTypes = {
    participation: PropTypes.object,
    user: PropTypes.object
  }

  render() {
    const { participation, user } = this.props;
    const { userType } = participation;
    const { name } = user;
    return (
      <li>
        <h3>{name} <small>{userType}</small></h3>
      </li>
    );
  }
}
