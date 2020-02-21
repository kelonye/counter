import { ACTION_TYPE_SET_COUNT } from 'config';

const DEFAULT_STATE = {
  count: 0,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_COUNT: {
      return action.payload;
    }

    default:
      return state;
  }
};
