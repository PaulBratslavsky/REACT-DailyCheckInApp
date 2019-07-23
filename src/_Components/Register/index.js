import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { fireDB } from '../../_Firebase/firebase';
import md5 from 'md5';


class Login extends Component {

  state = {
    loggedIn: false,
    userEmail: '',
    userPassword: '',
    userPassswordCheck: '',
    userName: '',
    errors: [],
    loading: false,
    userRef: fireDB.database().ref('users')
  }

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { userName, userEmail, userPassword, userPassswordCheck } = this.state;

    if ( this.isFormValid(userEmail, userPassword, userName, userPassswordCheck) ) {
      if ( this.isPasswordValid(userPassword, userPassswordCheck) ) {
        console.log('password match');
        this.createUser(userEmail ,userPassword, userName);
      } else {
        console.log('password does not match')
      }
      
      console.log('this form is valid');
    } else {
      console.log('form is not valid')
    }

  }

  isFormValid = (userEmail, userPassword) => userEmail && userPassword;

  isPasswordValid = ( userPassword, userPassswordCheck ) => {
    if ( userPassword === userPassswordCheck && userPassword.length >= 6) {
      console.log('Password mathes and correct length');
      return true;
    } else {
      console.log('Password either does not match or toonshort');
      return false;
    }
  } 

// Create User
createUser = (userEmail ,userPassword, userName) => {

  fireDB.auth().createUserWithEmailAndPassword(userEmail, userPassword)
  .then( ( createdUser ) =>  {
    console.log(createdUser, 'new user'); 

    createdUser.user.updateProfile({
      displayName: userName,
      photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
    })
    .then( () => {  
      this.saveUser(createdUser).then( () => {
        console.log('saved user');
      })
    })
    .catch( (error => {
      console.log(error);
      this.setState({
        errors: this.state.errors.concat(error),
        loading: false
      });
    }))

    this.setState({
      loggedIn: true,
      userName: '',
      userEmail: '',
      userPassword: '',
      userPassswordCheck: ''
    });
    console.log(createdUser);

  } )
  .catch( error => console.log(error) )
}

saveUser = ( createdUser ) => {
  console.log('user is set');
  return this.state.userRef.child(createdUser.user.uid).set({ 
    name: createdUser.user.displayName,
    avatar: createdUser.user.photoURL
  });

  
}

  render() {
    const { loggedIn } = this.state;
    return (
      <React.Fragment>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450, margin: '2%' }}>
            <Header as='h2' color='red' textAlign='center'>
              <Icon name='star' /> Create your account
            </Header>
            <Form size='large'>
              <Segment stacked>

              <Form.Input 
                  disabled={loggedIn}
                  onChange={this.handleInputChange}
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='Name' 
                  name='userName'
                  value={this.state.userName}
                />

                <Form.Input 
                  disabled={loggedIn}
                  onChange={this.handleInputChange}
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='E-mail address' 
                  name='userEmail'
                  value={this.state.userEmail}
                />

                <Form.Input
                  disabled={loggedIn}
                  onChange={this.handleInputChange}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='userPassword'
                  value={this.state.userPassword}
                />

              <Form.Input
                  disabled={loggedIn}
                  onChange={this.handleInputChange}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='userPassswordCheck'
                  value={this.state.userPassswordCheck}
                />

                <Button 
                  disabled={loggedIn} 
                  onClick={this.handleFormSubmit} 
                  color='red' 
                  fluid size='large'>
                  Create Account
                </Button>
              </Segment>
            </Form>
            <Message>
              Already a usser? <Link to='/'>Log In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Login;




  