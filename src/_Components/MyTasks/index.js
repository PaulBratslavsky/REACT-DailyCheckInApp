import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Header, Icon, Image, Menu, Button, Label } from 'semantic-ui-react';

import CreateGrat from './CreateGrat';

 class MyTasks extends Component {

  state = {
    showCreateCard: false,
    user: this.props.user
  }

  showCreateCard = () => {

    this.setState(prevState => ({
      showCreateCard: !prevState.showCreateCard
    }));
  }

  render() {
    console.log(this.state.user, 'NEED THIS DATA');
    return (
      <React.Fragment>
        <div style={{position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 300, background: '#e5e5e5'}}>
          
          <Menu secondary style={{padding: '0 2%'}}>
          <Menu.Menu position='left'>
          <Menu.Item style={{padding: 0}}>
        { this.state.showCreateCard ? <Icon onClick={this.showCreateCard} color='orange' size='big' name='minus circle' /> : <Icon onClick={this.showCreateCard} color='orange' size='big' name='plus circle' />  }
        <Header style={{padding: '14px 0', margin: 0}} as='h2' color='orange' textAlign='left'>
          MTB
          </Header>
        </Menu.Item>
        
          </Menu.Menu>
        
          
        <Menu.Menu position='right'>

          <Menu.Item>
            <Image style={{borderBottomLeftRadius: '5px', borderTopLeftRadius: '5px'}} src={this.props.user.photoURL} width='32px'/>

            <Label style={{marginLeft: '-7px', background: '#22ba46'}} onClick={this.props.logOutUser} size='huge' >
              {this.props.user.displayName}
              <Icon name='delete' />
            </Label>

          </Menu.Item>
          
        </Menu.Menu>
      </Menu>
        </div>
        <Container>
          
          <CreateGrat showCreateCard={this.state.showCreateCard} displayName={this.props.user.displayName} displayPhoto={this.props.user.photoURL} userUID={this.props.user.uid}/>
        </Container>
      </React.Fragment>
    );
  }
}
export default MyTasks;
