import { Schema, arrayOf } from 'normalizr';

const USER = new Schema('users', {
  idAttribute: 'id'
});

const GAME = new Schema('games', {
  idAttribute: 'id'
});

const Schemas = {
  USER,
  USER_ARRAY: arrayOf(USER),
  GAME,
  GAME_ARRAY: arrayOf(GAME)
};

export default Schemas;
