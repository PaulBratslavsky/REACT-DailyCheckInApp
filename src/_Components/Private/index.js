import React, { Component } from 'react'
import MainMenu from './MainMenu';
import MainView from './MainView';
class Private extends Component {
  render() {
    return (
      <React.Fragment>
        <MainMenu />
        <MainView />
      </React.Fragment>
    )
  }
}

export default Private;