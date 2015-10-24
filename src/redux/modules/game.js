import GAME from '../schema';

const CREATE = 'hvz/game/CREATE';
const CREATE_SUCCESS = 'hvz/game/CREATE_SUCCESS';
const CREATE_FAILURE = 'hvz/game/CREATE_FAILURE';
const LOAD = 'hvz/game/LOAD';
const LOAD_SUCCESS = 'hvz/game/LOAD_SUCCESS';
const LOAD_FAILURE = 'hvz/game/LOAD_FAILURE';

const initialState = {
  loading: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
    case LOAD:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_SUCCESS:
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_FAILURE:
    case LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.result
      };
    default:
      return state;
  }
}

export function create(title, description, start, end) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAILURE],
    promise: (client) => client.post('/games', {
      data: {
        title,
        description,
        start_time: start,
        end_time: end
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
