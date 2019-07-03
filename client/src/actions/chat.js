import axios from 'axios';

import { ADD_COMMENT, FETCH_CHAT, SEARCH_CHAT } from './types';

export const searchChats = word => async dispatch => {
  const res = await axios.get('/api/chat', {
    params: {
      search: word
    }
  });

  console.log(res.data);

  dispatch({
    type: SEARCH_CHAT,
    payload: res.data
  });
};

export const fetchChat = id => async dispatch => {
  const res = await axios.get(`/api/chat/${id}`);

  dispatch({
    type: FETCH_CHAT,
    payload: res.data[0]
  });
};

export const sendComment = (content, id) => async dispatch => {
  const res = await axios.post(`/api/chat/${id}`, content);

  dispatch({
    type: ADD_COMMENT,
    payload: res.data
  });
};

export const createChat = (name, tags, history) => async dispatch => {
  const res = await axios.post('/api/new/chat', { name, tags });

  history.push('/discover');
};
