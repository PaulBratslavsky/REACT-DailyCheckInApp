import React from 'react';
import AddTaskMenu from './AddTaskMenu';
import { connect } from 'react-redux';
import DisplayTasks from './DisplayTasks';

const MyTasks = (props) =>{
  return (
    <React.Fragment>
      <DisplayTasks />
      { props.showCreateCard && <AddTaskMenu /> }
    </React.Fragment>   
  )
}

const  mapStateToProps = (state) => {
  console.log(state);
  return {
    showCreateCard: state.menu.showCreateCard
  }
}

export default connect(mapStateToProps)(MyTasks);