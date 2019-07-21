import React, { Component } from 'react';
import { Form, Segment, Button, Card } from 'semantic-ui-react';
import GratCard from './GratCard';




class CreateGrat extends Component {

  state = {
    time: new Date(),
    delayGratTasks: [],
    taskName: '',
    startTime: '',
  }



  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value});

  handleTaskCreate = (e) => {
    console.log('Task Create Button Clicked');
    if (this.isInputEmpty(this.state.taskName)) {
      console.log('Task Not Saved');
    } else {
      this.saveTaskToDatabase();
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

  saveTaskToDatabase = () => {
    const date = new Date();



    const taskToSave = {
      taskName: this.state.taskName,
      startTime: date
    }

    this.setState({
      delayGratTasks: this.state.delayGratTasks.concat(taskToSave),
      taskName: '',
      startTime: '',
    })

  }

  displayTaskList = (taskList) => ( taskList.map( (task, index) => {
    return(
      <GratCard task={task} index={index} />
    );
  }) );

  render() {   
    console.log(this.state.taskName, 'single task name'); 
    console.log(this.state.delayGratTasks, 'current task list');

    return (
      
    <React.Fragment>
      { 
        this.props.showCreateCard && 
        <React.Fragment>
          <div style={{position: 'fixed', width: '100%', border: 'none', padding: '1rem', background: '#ffffff', 
        left: 0, bottom: 0, zIndex: 300, marginBottom: '0' }}stacked>
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
        </React.Fragment>
      }

      <Card.Group style={{marginTop: '65px'}}>
        { this.displayTaskList(this.state.delayGratTasks) }
      </Card.Group> 
    </React.Fragment>
    );
  }
}

export default CreateGrat;



