import React, { Component } from 'react';
import { Button, Card, Image, Label, Progress} from 'semantic-ui-react';
import Timmer from '../../Timmer';
import { connect } from 'react-redux';
import { removeData } from '../../../../_Redux/Reducers/dataReducer';
import { markCardComplete, restartCardTask } from '../../../../_Redux/Reducers/cardReducer';


class TaskCard extends Component {

  completeTask = (userUID, taskUID) => {
    const sectionName = 'tasks';
    this.props.markCardComplete(userUID, taskUID, sectionName);
  }

  restartTask = (userUID, taskUID) => {
    const sectionName = 'tasks';
    this.props.restartCardTask(userUID, taskUID, sectionName);
  }
  
  changeColorOnComplete = (complete, color) => {
    if (complete) {
      return {background: color};
    } 
  }

  deleteTaskFromDatabase = (userUID, taskUID) => {
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

    console.log(task.content.startTime, "TIME");

    return (
      <Card key={index} centered style={this.changeColorOnComplete(task.content.completed, '#efa037')}>
      <Card.Content>
        <Card.Header>
        { !task.content.completed 
            ? 
          <Timmer startTime={task.content.startTime} />
            : 
          this.timePassed(startTime, stopTime)
        }
          
        </Card.Header>
        
        <Card.Meta>{task.user.displayName}<Image floated='right' size='mini' src={task.user.displayPhoto} avatar/>
        </Card.Meta>

        <Card.Description>
        <strong>Task: </strong>{task.content.taskName}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        
        
        <div className='ui three buttons'>
        <Button onClick={ () =>  this.restartTask(task.user.userUID, task.content.taskUID) }  color='yellow' icon='redo'>
        </Button>
        { !task.content.completed &&  <Button onClick = { () => {this.completeTask(task.user.userUID, task.content.taskUID)} }  color='green' icon='check'>
          </Button>} 
          
          <Button onClick={ () =>  this.deleteTaskFromDatabase(task.user.userUID, task.content.taskUID) }  color='red' icon='remove'>
          </Button>
        </div>
      </Card.Content>
    </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.card, 'from state');
  return {
    card: state
  }
}

export default connect(mapStateToProps, {removeData, markCardComplete, restartCardTask })(TaskCard);
