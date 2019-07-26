import * as actionTypes from '../types';


// ACTIONS FOR USER REDUCER
export const clearUser = () => {
  return{
    type: actionTypes.CLEAR_USER,
  }
}

export const setUser = user => {
  return{
    type: 'SET_USER',
    payload: {
      user: user,
    }
  }
}

// USER REDUCER
export const userReducer = (state = null, action) => {

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.user,
      }
      
    case actionTypes.CLEAR_USER:
      return {
        ...state,
      }
    default: 
      return state;
  }
}