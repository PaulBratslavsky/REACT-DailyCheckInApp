import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import MyTasks from '../MyTasks';

class MainView extends Component {
  render() {
    return (
      <Container style={{marginTop: '60px'}}>
        <MyTasks />
      </Container>
    )
  }
}

export default MainView;
