import axios from 'axios';

import { FETCH_USER, ADD_ERROR, CLEAR_ERROR } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const editUser = (values, history) => async dispatch => {
  const res = await axios.post('/api/account/edit', values);

  if (res.data.editError) {
    dispatch({
      type: ADD_ERROR,
      payload: res.data
    });
  } else {
    history.push('/');
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  }
};

export const loginUser = (values, history) => async dispatch => {
  const res = await axios.post('/auth/login', values);

  if (res.data.loginError) {
    dispatch({
      type: ADD_ERROR,
      payload: res.data
    });
  } else {
    history.push('/');
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  }
};

export const registerUser = (values, history) => async dispatch => {
  const res = await axios.post('/auth/register', values);

  if (res.data.registerError) {
    dispatch({
      type: ADD_ERROR,
      payload: res.data
    });
  } else {
    history.push('/');
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  }
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
    payload: ''
  };
};
