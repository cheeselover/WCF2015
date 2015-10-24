import merge from 'lodash/object/merge';

const initialState = {
  users: {},
  games: {},
  participations: {}
};

export default function reducer(state = initialState, action = {}) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }
  return state;
}
