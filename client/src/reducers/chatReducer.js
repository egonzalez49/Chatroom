import { FETCH_CHAT } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CHAT:
      return action.payload;
    default:
      return state;
  }
}
