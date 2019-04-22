import { combineReducers } from 'redux';

const taskList = (tasks = [], action) => {
  if (action.type === "ADD_TASK") {
    return [ action.payload, ...tasks]
  }
  
  return tasks;
}

export default combineReducers({
  taskList: taskList
});
