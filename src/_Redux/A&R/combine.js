import * as actionTypes from './types';
import { combineReducers } from 'redux';

// ACTIONS FOR USER REDUCER
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

// USER REDUCER
const initialUserState = {
  user: null
}

const userReducer = (state = initialUserState, action) => {

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
      }
      
    case actionTypes.CLEAR_USER:
      return {
        ...state,
      }
    default: 
      return state;
  }
}

// ACTION FOR TOGGLE_ADD_CARD

export const toggleAddCard = () => {
  return {
    type: actionTypes.TOGGLE_ADD_CARD,
  }
}

// HANDLE MENU REDUCER

const menuReducer = (state = { showCreateCard: false }, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_ADD_CARD: {
      return {
        showCreateCard: !state.showCreateCard
      }
    }

    default: 
      return state;
  }
}

// ROOT REDUCER
const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer
});

export default rootReducer;
