import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class AddTaskMenu extends Component {
  render() {
    return (
      <div style={{position: 'fixed', width: '100%', border: 'none', padding: '1rem', background: '#ffffff', 
    left: 0, bottom: 0, zIndex: 300, marginBottom: '0' }}>
        <Form  size='large'>
            <Form.Input
              name='taskName'
              onChange={this.handleInputChange}
              value=''
              fluid icon='clock outline' 
              iconPosition='left' 
              placeholder='Add your task...' 
            />

            <Button onClick={this.handleTaskCreate} color='orange' fluid size='large'>
              Add
            </Button>
        </Form>
      </div>
    )
  }
}

export default AddTaskMenu;