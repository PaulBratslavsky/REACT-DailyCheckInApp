import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addData } from '../../../../_Redux/Reducers/dataReducer';
import { fireDB } from '../../../../_Firebase/firebase';

class AddTaskMenu extends Component {
  state = {
    taskName: ''
  }
  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value});

  handleTaskCreate = (e) => {
    console.log('Task Create Button Clicked');
    
    if (this.isInputEmpty(this.state.taskName)) {
      console.log('Task Not Saved');
    } else {
      const data = this.createTask();
      const userName = localStorage.getItem('userUid');
      const section = 'tasks';

      // ADD DATA ACTION - REDUX
      this.props.addData( data, userName, section);
      this.setState({taskName: ''});
      
      console.log('Task Saved');
    }

  }

  isInputEmpty = (input) => {
    if ( !input.length > 0 || input === '') {
      console.log('form is empty');
      return true;
    } else {
      console.log('form is not empty');
      return false;
    }
  }

  createTask = () => {

    const startTime = new Date();
    const newPostRef = fireDB.database().ref('tasks').push();
    const taskId = newPostRef.key;


    const task = {
      content: {
        taskName: this.state.taskName,
        startTime: startTime.toString(), 
        taskUID: taskId,
        completed: false
      },
      user: {
        // NEED TO FIGURE OUT BUT FOR NOW FROM LOCAL STORAGE
        displayName: localStorage.getItem('userName'),
        displayPhoto: localStorage.getItem('photoUrl'),
        userUID: localStorage.getItem('userUid'),
      }

    };

    return task;
  }



  render() {
    return (
      <div style={{position: 'fixed', width: '100%', border: 'none', padding: '1rem', background: '#ffffff', 
    left: 0, bottom: 0, zIndex: 300, marginBottom: '0' }}>
        <Form  size='large'>
            <Form.Input
              name='taskName'
              onChange={this.handleInputChange}
              value={this.state.taskName}
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



export default connect(null, { addData })(AddTaskMenu);