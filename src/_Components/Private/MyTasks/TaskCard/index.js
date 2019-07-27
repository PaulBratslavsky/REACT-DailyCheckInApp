import React, { Component } from 'react';
import { Button, Card, Image, Label, Progress} from 'semantic-ui-react';
import Timmer from '../../Timmer';
import { connect } from 'react-redux';
import { removeData } from '../../../../_Redux/Reducers/dataReducer';


class TaskCard extends Component {
  
  changeColorOnComplete = (complete, color) => {
    if (complete) {
      return {background: color};
    } 
  }

  deleteTaskFromDatabase = (userUID, taskUID) => {
    console.log(userUID, taskUID, 'delet clicked');
    const sectionName = 'tasks';
    this.props.removeData(userUID, taskUID, sectionName);
  }

   // CALCULATE TIME PASSED
   timePassed = (startTime, endTime) => {
     console.log(startTime, endTime, "from time passed");
    const timePassed = Math.round((endTime.getTime() - startTime.getTime())/1000);

    
    let diff = timePassed;
    let days = Math.floor(diff/(24*60*60)); 
    diff = diff-(days*24*60*60);
    let hours = Math.floor(diff/(60*60));
    diff = diff-(hours*60*60);
    let minutes = Math.floor(diff/(60));
    diff = diff-(minutes*60);
    let seconds = diff;

    return(
      <React.Fragment>
        <Label.Group>
          <Label size='medium' color='red'> Days <Label.Detail>{days}</Label.Detail></Label>
          <Label size='medium' color='orange'> Hours <Label.Detail>{hours}</Label.Detail></Label>
          <Label size='medium' color='yellow'> Minutes <Label.Detail>{minutes}</Label.Detail></Label>
        </Label.Group> 
        <Progress percent='100' indicating />
      </React.Fragment>
    );
  
    
  }

  render() {
    
    const { task, index } = this.props;
    const startTime = new Date(task.content.startTime);
    const stopTime = new Date(task.content.stopTime);

    console.log(task, "ERWEAWER")
    return (
      <Card key={index} centered style={this.changeColorOnComplete(task.content.completed, '#efa037')}>
      <Card.Content>
        { !task.content.completed 
            ? 
          <Timmer startTime={this.props.task.content.startTime} />
            : 
          this.timePassed(startTime, stopTime)
        }
        <Card.Meta>{task.user.displayName}<Image floated='right' size='mini' src={task.user.displayPhoto} avatar/>
</Card.Meta>
        <Card.Description>
        <strong>Task: </strong>{task.content.taskName}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        { !task.content.completed &&  <Button onClick = { () => {this.props.completeTask(task.user.userUID, task.content.taskUID)} }  color='green'>
            Complete
          </Button>} 
          
          <Button onClick={ () =>  this.deleteTaskFromDatabase(task.user.userUID, task.content.taskUID) }  color='red'>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
    );
  }
}

export default connect(null, {removeData})(TaskCard);
