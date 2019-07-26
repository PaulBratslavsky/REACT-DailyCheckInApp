import React from 'react';
import AddTaskMenu from './AddTaskMenu';
import { connect } from 'react-redux';

const MyTasks = (props) =>{
  return (
    <div>
        MyTasks
        { props.showCreateCard && <AddTaskMenu /> }
    </div>
  )
}

const  mapStateToProps = (state) => {
  console.log(state);
  return {
    showCreateCard: state.menu.showCreateCard
  }
}

export default connect(mapStateToProps)(MyTasks);