import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { create } from 'redux/modules/game';
import { pushState } from 'redux-router';

@connect(
  (state) => ({game: state.game}),
  {create, pushState}
)
export default class CreateGame extends Component {
  static propTypes = {
    create: PropTypes.func,
    pushState: PropTypes.func,
    game: PropTypes.object
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.loading && !this.props.game.loading && !this.props.game.error) {
      this.props.pushState(null, `/games/${this.props.game.lastCreated}`);
    }
  }

  handleSubmit() {
    const { title, description, start, end } = this.refs;
    this.props.create(title.value, description.value, start.value, end.value);
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title="Humans vs Zombies: Create Game"/>
        <h1>Create Game</h1>
        <form>
          <div className="form-group">
            <label>
              Title
              <input type="text" ref="title" className="form-control"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Description
              <textarea ref="description" className="form-control"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Start Time
              <input type="text" ref="start" className="form-control"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              End Time
              <input type="text" ref="end" className="form-control"/>
            </label>
          </div>
        </form>
        <button className="btn btn-primary" onClick={::this.handleSubmit}>Create</button>
      </div>
    );
  }
}
