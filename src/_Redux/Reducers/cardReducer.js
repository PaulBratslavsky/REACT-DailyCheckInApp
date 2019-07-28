import * as actionTypes from '../types';
import { fireDB } from '../../_Firebase/firebase';


export const markCardComplete =  ( userUID, taskId, sectionName ) => async (dispatch) => {
  
  const stopTime = new Date();

  await fireDB.database().ref(sectionName).child(userUID).once('value', function(snapshot) {
    snapshot.forEach( function(itemSnapshot) {
      if ( itemSnapshot.val().content.taskUID === taskId ) {
        return itemSnapshot.ref.child('content').update( {completed: true, stopTime: stopTime.toString() });
      }
      dispatch( { type: actionTypes.MARK_COMPLETE, payload: { completed: true, stopTime: stopTime.toString() } } );
    });
  }); 

}

// ACTION RESET TIME 
export const restartCardTask =  ( userUID, taskId, sectionName ) => async (dispatch, getState) => {
  console.log('Restart action fired!');

  const restartTime = new Date();

  await fireDB.database().ref(sectionName).child(userUID).once('value', function(snapshot) {
    snapshot.forEach( function(itemSnapshot) {
      if ( itemSnapshot.val().content.taskUID === taskId ) {
        return itemSnapshot.ref.child('content').update( {completed: false, startTime: restartTime.toString() });
      }

      dispatch( { type: actionTypes.RESTART_CARD_TASK, payload: { completed: false, stopTime: restartTime.toString() } } )
    });
  }); 

}

// CARD REDUCER
export const cardReducer = ( state = { }, action) => {

  switch (action.type) {
    case actionTypes.MARK_COMPLETE: {
      console.log('mark complete reducer fired');
      return action.payload;
    }

    case actionTypes.RESTART_CARD_TASK: {
      console.log('reset reducer fired');
      return action.payload;
    }
      
    default: 
      return state;
  }

}

