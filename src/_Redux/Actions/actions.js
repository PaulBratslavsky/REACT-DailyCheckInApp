import * as actionTypes from './types';

// ACTIONS
export const clearUser = () => {
  return{
    type: actionTypes.CLEAR_USER,
  }
}

export const setUser = user => {
  return{
    type: actionTypes.SET_USER,
    payload: {
      user: user,
    }
  }
}
