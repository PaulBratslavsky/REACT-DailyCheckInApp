import * as actionTypes from '../types';
import { fireDB } from '../../_Firebase/firebase';

/*

// CHECK OBJEC IS EMPTY
   isEmpty = (obj) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  loadDataBase = () => {

    let myArray = [];

    fireDB.database().ref('tasks').child(this.props.userUID).on('value', (snap) => {
      const myObject = snap.val();

      if ( !this.isEmpty(myObject) ) {
       myArray = Object.keys(myObject).map(i => myObject[i]);
      }
      
      this.setState({
        delayGratTasks: myArray
      });
    
      console.log( 'Component did mount');
      
    }) 

  }
  

*/

 


// ACTION HANDLE DATA 
export const fetchData = (userUid, sectionName) => async (dispatch) => {
  let myArray = [];
  await fireDB.database().ref(sectionName).child(userUid).on('value', (snap) => {
    const myObject = snap.val();
    myArray = Object.keys(myObject).map(i => myObject[i]);
    dispatch({ type: actionTypes.FETCH_TASKS, payload: myArray })
  }) 
}

// HANDLE DATA REDUCER
export const dataReducer =  (state = [], action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_TASKS: {
      return action.payload;
    }

    default: 
      return state;
  }
}