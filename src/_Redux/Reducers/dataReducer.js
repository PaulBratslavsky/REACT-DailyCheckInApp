import * as actionTypes from '../types';
import { fireDB } from '../../_Firebase/firebase';

// ACTION FETCH DATA 
export const fetchData = (userUid, sectionName) => async (dispatch) => {

  let myArray = [];

  await fireDB.database().ref(sectionName).child(userUid).on('value', (snap) => {
    // CHECK IF OBJECT IS EMPTY
    const isEmpty = (obj) => {
    for(let key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
    }

    const myObject = snap.val();

    if (!isEmpty(myObject) ) {
      myArray = Object.keys(myObject).map(i => myObject[i]);
      dispatch({ type: actionTypes.FETCH_TASKS, payload: myArray })
    }
    

  }) 
}

// ACTION REMOVE TASK
export const removeData = (userUID, taskUID, sectionName) => async ( dispatch, getState ) => {
  
  await fireDB.database().ref(sectionName).child(userUID).once("value", function(snapshot) {
    
    snapshot.forEach(function(itemSnapshot) {
        if ( itemSnapshot.val().content.taskUID === taskUID) {
          return itemSnapshot.ref.remove();
        }
    }); 

    const newArray = getState().data.filter( tasks =>  tasks.content.taskUID !== taskUID );

    dispatch({ type: actionTypes.FETCH_TASKS, payload: newArray });


  }); 
}


// ACTION ADD TASK
export const addData = (data, userUid, sectionName) => async ( dispatch, getState ) => {
  console.log(getState.data);
  await fireDB.database().ref(sectionName).child(userUid).push().set(data);
  dispatch({ type: actionTypes.ADD_TASK, payload: [ ...getState().data]})
  console.log('Data saved');
}

// HANDLE DATA REDUCER
export const dataReducer =  (state = [], action ) => {
  switch ( action.type ) {

    case actionTypes.FETCH_TASKS: {
      return action.payload;
    }

    case actionTypes.ADD_TASK: {
      return action.payload;
    }

    case actionTypes.REMOVE_TASK: {
      return action.payload;
    }

    default: 
      return state;
  }
}
