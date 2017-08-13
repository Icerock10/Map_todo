import React, { Component } from 'react';
import ServiceType from './serviceType';
import Additional from './additional';

import Electrician from '../../images/Electrician.svg';
import Plumber from '../../images/Plumber.svg';
import Gardener from '../../images/Gardener.svg';
import Housekeeper from '../../images/Housekeeper.svg';
import Cook from '../../images/Cook.svg';

  const typeArray = [
  { name: 'Electrician', src : Electrician },
  { name: 'Plumber',   src : Plumber },
  { name: 'Gardener', src : Gardener },
  { name: 'Housekeep', src : Housekeeper },
  { name: 'Flunkey', src : Cook }];

class TaskEditor extends Component {
    constructor(props) {
      super(props);
      const {taskToEdit} = this.props;
           this.state = {
           selectedType: taskToEdit ? taskToEdit.type : 'Electrician',
           serviceList: typeArray,
           selectedTask: taskToEdit ? taskToEdit.name : 'Screw in a light bulb',
           description: taskToEdit ? taskToEdit.description : '',
      }
      this.handleTypeChange = this.handleTypeChange.bind(this);  // arrow func does'nt work cause of webpack config
      this.handleTaskChange = this.handleTaskChange.bind(this);
      this.onDescriptionChange = this.onDescriptionChange.bind(this);
      this.onCreateTask = this.onCreateTask.bind(this);
    }
    handleTypeChange(sType) {
      this.setState({
        selectedType: sType,
        selectedTask: '',
     })
   }
     handleTaskChange(task) {
       this.setState({
         selectedTask: task,
      })
  }
     onDescriptionChange(e) {
       this.setState({
         description: e.target.value,
       });
     }
     onCreateTask() {
         const resultObj = {
           type: this.state.selectedType,
           name: this.state.selectedTask,
           location: {lat: '' , lng: ''},
           description: this.state.description,
        }
        if (this.props.taskToEdit && this.props.onTaskUpdate) {
           this.props.onTaskUpdate(resultObj);
           return;
           console.log(this.props.onTaskUpdate)
           console.log(this.props.taskToEdit)
        }
        if (this.props.onTaskCreate) {
          this.props.onTaskCreate(resultObj);
        }
     }
    render() {
      const label = this.props.taskToEdit ? 'Update task' : 'Create Task';
        return (
        <div className="container__sidebar">
          <div className="sidebar__newtasks">
            <span className="item__task">
                I need a <b>{this.state.selectedType}</b> to <b>{this.state.selectedTask}</b>
                <div>{this.state.description}</div>
           </span>
              <button className="sidebar__button_createtask" onClick={this.onCreateTask}>{label}</button>
         </div>
            <div className="sidebar__location">
               <span className="location__title">LOCATION</span>
            </div>
          <div className="sidebar__title">SERVICE TYPE</div>
              <div className="sidebar__images">
                  {this.state.serviceList.map((sType, ind) => {
                  return <ServiceType key={ind} onTypeChange={this.handleTypeChange} name={sType.name} src={sType.src} />
               })}
          </div>
              <div className="sidebar__additional">
                 <span className="additional__current_task">{this.state.selectedType.toUpperCase()} TASKS</span>
                 <Additional currentActive={this.state.selectedType} onAdditionalChange={this.handleTaskChange} />
             </div>
             <div className="task__description">
                <span className="description__title">DESCRIPTION</span>
                <textarea className="description__textarea" maxLength="30" onChange={this.onDescriptionChange}></textarea>
             </div>
          </div>
        )
    }
}

export default TaskEditor;
