import React, { Component } from 'react';
import './App.css';
import Header from '../containers/Header';
import Map from './mapController/map';
import AddNewTask from './Tasks/addNewTask';
import TaskEditor from './Tasks/taskEditor';

const currentYear = () => new Date().getDate() + '.' + 0 + new Date().getMonth() + '.' + new Date().getFullYear();
const currentTime = () => new Date().getHours() + ':' + new Date().getMinutes();

class App extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      countId: 0,
      createdTasks: [],
      currentYear: currentYear(),
      currentTime: currentTime(),
      editedTask: null,
      data: null,
  };
    this.handleEdit = this.handleEdit.bind(this);
    this.createTask = this.createTask.bind(this);
    this.onDeletedTask = this.onDeletedTask.bind(this);
    this.onTaskUpdate = this.onTaskUpdate.bind(this);
  }
  componentDidMount() {
    fetch('api/tasks')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
         this.setState({ createdTasks: data.tasks });
       });
  }
  handleEdit() {
      this.setState({
      showEdit: true
    });
  }
  createTask(task) {
    const {createdTasks} = this.state;
    task.countId = ++this.state.countId;
    console.log(task);
    fetch('api/tasks/add', {
      body: JSON.stringify(task),
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
     }).then(res => {
       console.log(res)
        if (res.status === 200) {
          createdTasks.push(task);
            this.setState({
            createdTasks,
        });
      }
    });
  }
  onTaskUpdate(task) {
    const {createdTasks} = this.state;
          console.log(task)
          let filteredTasks = createdTasks.filter(t => t.countId !== task.countId);
          filteredTasks.push(task);
          this.setState({
          editedTask: task,
          showEdit: true,
        })
  }
  onDeletedTask(task) {
    const {createdTasks} = this.state;
      fetch('api/tasks/remove', {
      body: JSON.stringify(task),
      method: 'DELETE',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
    }).then(res => {
      console.log(res)
      if(res.status === 200) {
        let filteredTasks = createdTasks.filter(t => t.countId !== task.countId);
          this.setState({
          createdTasks: filteredTasks,
          showEdit: false,
          editedTask: null
        })
      }
    })
  }
  render() {
    console.log(this.state.createdTasks)
    const tasks = this.state.createdTasks.map((task ,index) => {
      return (
        <div key={index} className="result__tasks">
              <span>{this.state.currentYear}, {this.state.currentTime}</span>
              I need a {task.type} to {task.name}  {task.description}
          <div className="result__buttons">
             <button className="result__button_update" onClick={() => this.onTaskUpdate(task)}>Edit</button>
             <button className="result__button_delete" onClick={() => this.onDeletedTask(task)}>Delete</button>
          </div>
        </div>
      );
    })
    return (
      <div className="b-root">
        <Header />
        <div className="b-root__bodymap">
          <Map
            containerElement={<div style={{ height: 100 + '%' }} />}
            mapElement={<div style={{ height: 100 + '%' }} />}
           />
            <AddNewTask onNewTask={this.handleEdit} />
            {this.state.showEdit ? (
                <TaskEditor
                taskToEdit={this.state.editedTask}
                onTaskCreate={this.createTask}
                onTaskUpdate={this.updateTask}
                />
            ) : null}
            {tasks}
          </div>
      </div>
    );
  }
}
export default App;
