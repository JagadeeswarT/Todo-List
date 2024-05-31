import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import AddTask from './AddTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await axios.post('http://localhost:3001/api/tasks', { title, completed: false });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/task/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.patch(`http://localhost:3001/api/tasks/${id}`, { completed });
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />
    </div>
  );
}

export default App;
