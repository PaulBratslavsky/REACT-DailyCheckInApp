import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { fireDB } from '../../_Firebase/firebase';

class Login extends Component {

  state = {
    userEmail: '',
    userPassword: '',
    errors: []
  }

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = this.state;

    if ( this.isFormValid(userEmail, userPassword) ) {
      this.loginUser(userEmail ,userPassword);
    } else {
      console.log('form is not valid')
    }

    

  }

  isFormValid = (userEmail, userPassword) => userEmail && userPassword;

  // Login User
  loginUser = (email, password) => {
  fireDB.auth().signInWithEmailAndPassword(email, password)
  .then( ( singnedInUser ) => {
    this.setState({
      loggedIn: true,
      userEmail: '',
      userPassword: ''
    });
    console.log(singnedInUser);

  } )
  .catch( error => console.log(error) )
}

  render() {
    console.log(this.state, 'from state');
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450, margin: '2%' }}>
          <Header as='h2' color='orange' textAlign='center'>
            <Icon name='star' /> Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input 
                onChange={this.handleInputChange}
                fluid icon='user' 
                iconPosition='left' 
                placeholder='E-mail address' 
                name='userEmail'
                value={this.state.userEmail}
              />
              <Form.Input
                onChange={this.handleInputChange}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='userPassword'
                value={this.state.userPassword}
              />

              <Button 
                onClick={this.handleFormSubmit} 
                color='orange' 
                fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <Link to='/register'>Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login;




  