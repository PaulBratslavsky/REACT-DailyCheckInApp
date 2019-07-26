import { combineReducers } from 'redux';

// IMPORT ALL REDUCERS
import { userReducer } from './Reducers/userReducer';
import { menuReducer } from './Reducers/menuReducer';
import { dataReducer } from './Reducers/dataReducer';

// ROOT REDUCER
const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  data: dataReducer
});

export default rootReducer;
