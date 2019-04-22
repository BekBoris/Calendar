import '../style/App.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToEventList } from '../action';
import Display from './Display';

class App extends Component {
  constructor() {
    super();
    this.state = {task: '', dateDisplayInfo: {} };
  }

  onInputChange(event) {
    this.setState({task: event.target.value})
  }

  onInputSubmit (event) {
    event.preventDefault();
    this.setState({task: ""});
    return this.props.addToEventList(this.state.task, this.state.dateDisplayInfo);
  }


  taskToList() {

    return this.props.taskList.map((task) => {
      return (
        <div key={task.task}>
          <p className="task">{task.task}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="mainCont">
        <h2> React Calendar </h2>
        <h4> Appointments </h4>
        <h4> Make a new Appointments </h4>

        <div>
          <form onSubmit={(event) => {this.onInputSubmit(event)}}>
            <input type="text" value={this.state.task} onChange={(event) => {this.onInputChange(event)}}
              placeholder="Task Input"/>
          </form>
        </div>

        <Display dataInfo={this.dataInfo} dataInfoUpdate={this.dataInfoUpdate} />

        <button onClick={() => {this.setState({task:""});
                                this.props.addToEventList(this.state.task, this.state.dateDisplayInfo)}}>
            Make an Appointments
         </button>
        <div>
          { this.taskToList() }
        </div>



      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {taskList: state.taskList}
};

export default connect(mapStateToProps, {addToEventList})(App);
