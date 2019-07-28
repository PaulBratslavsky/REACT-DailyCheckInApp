import { combineReducers } from 'redux';

// IMPORT ALL REDUCERS
import { userReducer } from './Reducers/userReducer';
import { menuReducer } from './Reducers/menuReducer';
import { dataReducer } from './Reducers/dataReducer';
import { cardReducer } from './Reducers/cardReducer';

// ROOT REDUCER
const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  data: dataReducer,
  card: cardReducer
});

export default rootReducer;
