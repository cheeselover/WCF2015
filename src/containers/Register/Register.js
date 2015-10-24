import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    register: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    const name = this.refs.name;
    const password = this.refs.password;
    const passwordConfirmation = this.refs.passwordConfirmation;
    this.props.register(email.value, name.value, password.value, passwordConfirmation.value);
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="Humans vs Zombies: Register"/>
        <h1>Register</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <input type="text" ref="email" placeholder="Email"/>
            <br/>
            <input type="text" ref="name" placeholder="Name"/>
            <br/>
            <input type="password" ref="password" placeholder="Password"/>
            <br/>
            <input type="password" ref="passwordConfirmation" placeholder="Password Confirmation"/>
            <br/>
            <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/> Register
            </button>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.email}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
