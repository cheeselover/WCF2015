import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, schema, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      const req = promise(client);
      return req.then(
        (result) => {
          if (schema) {
            const camelizedJson = camelizeKeys(result);
            const entities = normalize(camelizedJson, schema).entities;
            next({...rest, result, entities, type: SUCCESS});
          } else {
            next({...rest, result, type: SUCCESS});
          }
        }, (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}
