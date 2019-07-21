import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { Button } from 'semantic-ui-react';

import DelyaGrat from './_Components/DelayGrat';
import Login from './_Components/LogIn';
import Register from './_Components/Register';


import { fireDB } from './_Firebase/firebase';
import DelayGrat from './_Components/DelayGrat';


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
      <React.Fragment>
        <Switch>
          <Route exact path='/delaygrat' component={DelyaGrat} />
          <Route 
          exact path='/' 
          render={(props) => <Login {...props} 
            user={this.state.user} 
            loggedIn={this.state.loggedIn}
            />} 
        />
        <Route path='/register' component={Register} />

        <Route render={ (props) => ( this.state.user 
            ? <DelayGrat {...props} user={this.state.user} logOutUser={this.logOutUser}/> 
            : <Redirect to='/login' />
        )} 
        />
        </Switch> 
      </React.Fragment>
       
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