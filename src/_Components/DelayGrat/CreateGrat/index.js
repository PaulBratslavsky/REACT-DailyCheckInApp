import React, { Component } from 'react';
import { Form, Button, Card } from 'semantic-ui-react';
import GratCard from './GratCard';
import { fireDB } from './../../../_Firebase/firebase';




class CreateGrat extends Component {

  state = {
    delayGratTasks: [],
    taskName: '',
    taskRef: fireDB.database().ref('tasks'),
    errors: [],
  }

  componentDidMount() {
    // this.removeTaskListener();
    this.addTaskListener();
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

  createTask = () => {

    const startTime = new Date();
    const newPostRef = this.state.taskRef.push();
    const taskId = newPostRef.key;


    const task = {
      content: {
        taskName: this.state.taskName,
        startTime: startTime.toString(), 
        taskUID: taskId,
      },
      user: {
        displayName: this.props.displayName,
        displayPhoto: this.props.displayPhoto,
        userUID: this.props.userUID,
      }

    };

    return task;
  }

  updateStateOnRemove = (itemRemoved) => {
    const oldArray = this.state.delayGratTasks;

    const newArray = oldArray.filter( tasks => {
      if ( tasks.content.taskUID !== itemRemoved ) {
        return tasks;
      }
    })
    console.log(newArray, 'FROM UPDATE ON REMOVE')
    this.setState({delayGratTasks: newArray })
  }
  saveTaskToDatabase = () => {

    this.state.taskRef
      .child(this.props.userUID)
      .push()
      .set(this.createTask())
      .then( () => {
        this.setState({
          delayGratTasks: this.state.delayGratTasks.concat(this.createTask()),
          taskName: '',
          startTime: '',
          loading: false, 
          errors: []
        })

      })
      .catch( (errors) => { 
        console.log(errors); 
        this.setState({ 
          loading: false,
          errors: this.state.concat(errors) 
        });
      }); 
  }

  deleteTaskFromDatabase = (userId, taskId) => {

    const listRef = this.state.taskRef.child(userId);

    listRef.once("value", function(snapshot) {
      snapshot.forEach(function(itemSnapshot) {
          if ( itemSnapshot.val().content.taskUID === taskId ) {
            return itemSnapshot.ref.remove();
          }
      }); 
    });

    this.updateStateOnRemove(taskId);
    console.log('Task Removed');
    
  }
  
  addTaskListener = () => {
    let loadedMessages = [];

    this.state.taskRef.child(this.props.userUID).on('child_added', (snap) => {
      
      loadedMessages.push(snap.val());
      
      if ( loadedMessages.length > 0 ) {
        this.setState({
          delayGratTasks: loadedMessages,
        });
      }
      

      console.log(loadedMessages, 'from add listener messages')
    })
  }
/*
  removeTaskListener = () => {
    let loadedMessages = [];

    this.state.taskRef.child(this.props.userUID).on('child_removed', (snap) => {
      loadedMessages.push(snap.val());

      this.setState({
        delayGratTasks: loadedMessages,
      });

      console.log(loadedMessages, 'from remove listener messages')
    })
  }
  
*/
  displayTaskList = (taskList) => ( taskList.length > 0 && taskList.map( (task, index) => {
    return(
      <GratCard 

        task={task} 
        key={index} 
        deleteTaskFromDatabase={this.deleteTaskFromDatabase}
    
      />
    );
  }));

  

  render() {   

    return (
      
    <React.Fragment>
      { 
        this.props.showCreateCard && 
        <React.Fragment>
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



