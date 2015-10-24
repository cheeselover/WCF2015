import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as gameActions from 'redux/modules/game';

@connect(() => ({}), gameActions)
export default class CreateGame extends Component {
  static propTypes = {
    create: PropTypes.func
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
        <form onSubmit={::this.handleSubmit}>
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
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}
