import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Login from './_Components/LogIn';
import Register from './_Components/Register';
import { connect } from 'react-redux';


import { fireDB } from './_Firebase/firebase';
import Private from './_Components/Private';

import { setUser, clearUser } from './_Redux/Reducers/userReducer';

class Root extends Component {

  componentWillMount() {
    this.authListener();
  }

  authListener() {
    fireDB.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.setUser(user);
        localStorage.setItem('userName', user.displayName);
        localStorage.setItem('photoUrl', user.photoURL);
        localStorage.setItem('userUid', user.uid);
        this.props.history.push('/private');    


        console.log('LOGGEDIN')
      } else {
        this.props.clearUser();
        localStorage.removeItem('userName');
        localStorage.removeItem('photoUrl');
        localStorage.removeItem('userUid')
        this.props.history.push('/');  
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (   
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/private' component={Private} /> 
        </Switch> 
      </React.Fragment>
    );
  }
  
}



export default connect(null, { setUser, clearUser })(Root);

