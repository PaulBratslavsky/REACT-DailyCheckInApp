import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Header, Icon } from 'semantic-ui-react';

import CreateGrat from './CreateGrat';

 class DelayGrat extends Component {

  state = {
    showCreateCard: false
  }

  showCreateCard = () => {

    this.setState(prevState => ({
      showCreateCard: !prevState.showCreateCard
    }));

    console.log('show card cliked');

  }

  render() {
    return (
      <React.Fragment>
        <div style={{position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 300, background: '#e5e5e5'}}>
          <Header style={{padding: '14px', margin: 0}} as='h2' color='orange' textAlign='left'>
          { this.state.showCreateCard ? <Icon onClick={this.showCreateCard} color='orange' size='big' name='minus circle' /> : <Icon onClick={this.showCreateCard} color='orange' size='big' name='plus circle' />  }My Task Buddy 
          </Header>
        </div>
        <Container>
          
          <CreateGrat showCreateCard={this.state.showCreateCard} />
        </Container>
      </React.Fragment>
    );
  }
}
export default DelayGrat;
