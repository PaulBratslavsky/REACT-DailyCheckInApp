import React, { Component } from 'react';

// IMPORT DATABASE
import { fireDB } from './../../../_Firebase/firebase';

// IMPORT STYLE
import { Header, Icon, Image, Menu, Label } from 'semantic-ui-react';

//IMPORT REDUX
import { connect } from 'react-redux';

import { toggleAddCard } from './../../../_Redux/A&R/combine';
 

 class MainMenu extends Component {

  state = {
    displayName: localStorage.getItem('userName'),
    photoURL: localStorage.getItem('photoUrl'),
  }
  
  showCreateCard = () => {
    this.props.toggleAddCard();
  }

  logOutUser = () => {
    fireDB.auth().signOut();
    console.log('LOGGED OUT');
  }

  render() {
    console.log(this.props.showCreateCard);
    return (
      <div style={{position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 300, background: '#e5e5e5'}}>
          
      <Menu secondary style={{padding: '0 2%'}}>
        
        <Menu.Menu position='left'>
          <Menu.Item style={{padding: 0}}>
        { this.props.showCreateCard ? <Icon onClick={this.showCreateCard} color='orange' size='big' name='minus circle' /> : <Icon onClick={this.showCreateCard} color='orange' size='big' name='plus circle' />  }
          <Header style={{padding: '14px 0', margin: 0}} as='h2' color='orange' textAlign='left'>
          MTB
          </Header>
          </Menu.Item>
        </Menu.Menu>
        
        <Menu.Menu position='right'>
          <Menu.Item>
            <Image style={{borderBottomLeftRadius: '5px', borderTopLeftRadius: '5px'}} src={this.state.photoURL} width='32px'/>

            <Label style={{marginLeft: '-7px', background: '#22ba46'}} onClick={this.logOutUser} size='huge' >
              {this.state.displayName}
              <Icon name='delete' />
            </Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </div>
    );
  }
}

const  mapStateToProps = (state) => {
  return {
    user: state.user, 
    showCreateCard: state.menu.showCreateCard
  }
}

export default connect(mapStateToProps, { toggleAddCard })(MainMenu);
