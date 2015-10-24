import { Schema, arrayOf } from 'normalizr';

const USER = new Schema('users', {
  idAttribute: 'id'
});
const USER_ARRAY = arrayOf(USER);

const GAME = new Schema('games', {
  idAttribute: 'id'
});
const GAME_ARRAY = arrayOf(GAME);

const PARTICIPATION = new Schema('participations', {
  idAttribute: 'id'
});
const PARTICIPATION_ARRAY = arrayOf(PARTICIPATION);

// relations

USER.define({participations: PARTICIPATION_ARRAY});
GAME.define({participations: PARTICIPATION_ARRAY});
PARTICIPATION.define({user: USER, game: GAME});

const Schemas = {
  USER,
  USER_ARRAY,
  GAME,
  GAME_ARRAY,
  PARTICIPATION,
  PARTICIPATION_ARRAY,
};

export default Schemas;
