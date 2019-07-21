import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import DelyaGrat from './_Components/DelayGrat';



import { fireDB } from './_Firebase/firebase';


class Root extends Component {

  state = {
    loading: false,
    user: null,
    loggedIn: false
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fireDB.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user: user, loggedIn: true });
        localStorage.setItem('user', user.uid);
        this.props.history.push('/private');    


        console.log('LOGGEDIN')
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        this.props.history.push('/');    


      }
    });
  }

  logOutUser = () => {
    fireDB.auth().signOut();
    this.setState({ loggedIn: false });
    console.log('LOGGED OUT');
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (   
      <Switch>
        <Route exact path='/' component={DelyaGrat} />
      </Switch>  
    );
  }
  
}

export default Root;

/* 

 state = {
    loading: false,
    user: null,
    loggedIn: false
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fireDB.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user: user, loggedIn: true });
        localStorage.setItem('user', user.uid);
        this.props.history.push('/private');    


        console.log('LOGGEDIN')
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        this.props.history.push('/');    


      }
    });
  }

  logOutUser = () => {
    fireDB.auth().signOut();
    this.setState({ loggedIn: false });
    console.log('LOGGED OUT');
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (   
      <React.Fragment>
      
      { this.state.loggedIn && <button onClick={this.logOutUser}>log out</button> }


      <Switch>

        <Route 
          exact path='/' 
          render={(props) => <Login {...props} 
            user={this.state.user} 
            loggedIn={this.state.loggedIn}
            />} 
        />
        <Route path='/register' component={Register} />

        <Route render={ (props) => ( this.state.user 
            ? <Private {...props} /> 
            : <Redirect to='/login' />

        )} 
        />

      </Switch>
      </React.Fragment>   
    );
  }
  
}

export default Root;

*/