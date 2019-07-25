import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import userReducer from './_Redux/Reducers/userReducer';

import './index.css';

import Root from './Root';


const store = createStore(userReducer);
const RootWithAuth = withRouter(connect()(Root));


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider> , 

document.getElementById('root'));
