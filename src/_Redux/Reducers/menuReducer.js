import * as actionTypes from '../types';

// ACTION FOR TOGGLE_ADD_CARD

export const toggleAddCard = () => {
  return {
    type: actionTypes.TOGGLE_ADD_CARD,
  }
}

// HANDLE MENU REDUCER

export const menuReducer = (state = { showCreateCard: false }, action) => {
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


