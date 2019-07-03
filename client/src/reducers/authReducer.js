import { FETCH_USER, ADD_ERROR, CLEAR_ERROR } from '../actions/types';

var initializedState = {
  user: null,
  error: ''
};

export default function(state = initializedState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
    case ADD_ERROR:
      return { ...state, error: action.payload };
    case FETCH_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
