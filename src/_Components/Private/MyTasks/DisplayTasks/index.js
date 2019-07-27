import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../../../_Redux/Reducers/dataReducer';
import { Card } from 'semantic-ui-react';
import TaskCard from '../TaskCard';

class DisplayTasks extends Component {

  componentWillMount() {
    // Get Data
    const userUid = localStorage.getItem('userUid'); 
    const sectionName = 'tasks';   
    this.props.fetchData(userUid, sectionName);
  }


  displayTasks = (tasks) => {

    if (tasks.length > 0 ) {
      return tasks.map( ( task )  => {

        return(
          <TaskCard
            task={task} 
            key={task.content.taskUID} 
            deleteTaskFromDatabase={this.deleteTaskFromDatabase}
            completeTask={this.completeTask}  
          /> 
        );
      }
    );
    }
  }

  render() {

      console.log(this.props.tasks, "WHY CANT I WORK WITH THIS WHAT AM I MISING")

    return(
      <Card.Group style={{marginTop: '65px'}}>
        { this.displayTasks(this.props.tasks)}
      </Card.Group>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state, 'fdf');
  return {
    tasks: state.data
  }
}

export default connect(mapStateToProps, { fetchData })(DisplayTasks);