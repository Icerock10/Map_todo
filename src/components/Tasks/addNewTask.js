import React, { Component } from 'react';
import '../../components/App.css';

class AddNewTask extends Component {
  constructor(props) {
    super(props);
    this.onTaskClick = this.onTaskClick.bind(this);
  }
  onTaskClick() {
    this.props.onNewTask();
  }
  render() {
    return (
      <div>
        <div className="addTask" onClick={() => {this.onTaskClick()}}>
          <span className="addTask__item">+ NEW TASK </span>
        </div>
      </div>
    );
  }
}

export default AddNewTask;
