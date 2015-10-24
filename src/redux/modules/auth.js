const LOAD = 'hvz/auth/LOAD';
const LOAD_SUCCESS = 'hvz/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'hvz/auth/LOAD_FAIL';
const LOGIN = 'hvz/auth/LOGIN';
const LOGIN_SUCCESS = 'hvz/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'hvz/auth/LOGIN_FAIL';
const LOGOUT = 'hvz/auth/LOGOUT';
const LOGOUT_SUCCESS = 'hvz/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'hvz/auth/LOGOUT_FAIL';
const REGISTER = 'hvz/auth/REGISTER';
const REGISTER_SUCCESS = 'hvz/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'hvz/auth/REGISTER_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        user: action.result
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registeringError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/users/login', {
      data: {
        username: username,
        password: password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

export function register(username, password) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/users', {
      data: {
        username: username,
        password: password
      }
    })
  };
}
