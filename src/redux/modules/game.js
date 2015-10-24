import { GAME, GAME_ARRAY, PARTICIPATION } from '../schema';

const CREATE = 'hvz/game/CREATE';
const CREATE_SUCCESS = 'hvz/game/CREATE_SUCCESS';
const CREATE_FAILURE = 'hvz/game/CREATE_FAILURE';
const LOAD = 'hvz/game/LOAD';
const LOAD_SUCCESS = 'hvz/game/LOAD_SUCCESS';
const LOAD_FAILURE = 'hvz/game/LOAD_FAILURE';
const LOAD_ALL = 'hvz/game/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'hvz/game/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAILURE = 'hvz/game/LOAD_ALL_FAILURE';
const JOIN = 'hvz/game/JOIN';
const JOIN_SUCCESS = 'hvz/game/JOIN_SUCCESS';
const JOIN_FAILURE = 'hvz/game/JOIN_FAILURE';
const LEAVE = 'hvz/game/LEAVE';
const LEAVE_SUCCESS = 'hvz/game/LEAVE_SUCCESS';
const LEAVE_FAILURE = 'hvz/game/LEAVE_FAILURE';
const UPDATE = 'hvz/game/UPDATE';
const UPDATE_SUCCESS = 'hvz/game/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'hvz/game/UPDATE_FAILURE';

const initialState = {
  loading: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
    case LOAD:
    case LOAD_ALL:
    case JOIN:
    case LEAVE:
    case UPDATE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_SUCCESS:
    case LOAD_SUCCESS:
    case LOAD_ALL_SUCCESS:
    case JOIN_SUCCESS:
    case LEAVE_SUCCESS:
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        lastCreated: action.result.id
      };
    case CREATE_FAILURE:
    case LOAD_FAILURE:
    case LOAD_ALL_FAILURE:
    case JOIN_FAILURE:
    case LEAVE_FAILURE:
    case UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.result
      };
    default:
      return state;
  }
}

export function create(title, description, startTime, endTime) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE],
    promise: (client) => client.post('/games', {
      data: {
        title,
        description,
        start_time: startTime,
        end_time: endTime
      }
    }),
    schema: GAME
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    promise: (client) => client.get(`/games/${id}`),
    schema: GAME
  };
}

export function loadAll() {
  return {
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAILURE],
    promise: (client) => client.get('/games'),
    schema: GAME_ARRAY
  };
}

export function join(id) {
  return {
    types: [JOIN, JOIN_SUCCESS, JOIN_FAILURE],
    promise: (client) => client.post(`/games/${id}`),
    schema: GAME
  };
}

export function leave(id) {
  return {
    types: [LEAVE, LEAVE_SUCCESS, LEAVE_FAILURE],
    promise: (client) => client.del(`/games/${id}`),
    schema: PARTICIPATION
  };
}

export function start(id) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE],
    promise: (client) => client.patch(`/games/${id}`, {
      data: {
        running: true
      }
    }),
    schema: GAME
  };
}

export function stop(id) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE],
    promise: (client) => client.patch(`/games/${id}`, {
      data: {
        running: false
      }
    }),
    schema: GAME
  };
}

export function isLoaded(state, id) {
  return !!state.entities.games[id];
}
