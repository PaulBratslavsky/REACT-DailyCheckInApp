import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Header, Icon } from 'semantic-ui-react';

import CreateGrat from './CreateGrat';

 class DelayGrat extends Component {
  render() {
    return (
      <React.Fragment>
        <Header style={{marginTop: '1rem'}} as='h2' color='teal' textAlign='center'>
          <Icon name='calendar alternate outline' /> Add Task To Deffer
        </Header>
        <Container>
          <CreateGrat />
        </Container>
      </React.Fragment>
    );
  }
}
export default DelayGrat;
