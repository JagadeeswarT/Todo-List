// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// const Task = ({ task, onDelete, onToggle }) => {
//   const handleDelete = () => {
//     onDelete(task.id);
//   };

//   const handleToggle = () => {
//     onToggle(task.id, !task.completed);
//   };

//   return (
//     <div className={`task ${task.completed ? 'completed' : ''}`}>
//       <input
//         type="checkbox"
//         checked={task.completed}
//         onChange={handleToggle}
//       />
//       <span>{task.title}</span>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// const TodoList = ({ tasks, onDelete, onToggle }) => {
//   return (
//     <div className="todo-list">
//       <h2>To-Do List</h2>
//       {tasks.map(task => (
//         <Task
//           key={task.id}
//           task={task}
//           onDelete={onDelete}
//           onToggle={onToggle}
//         />
//       ))}
//     </div>
//   );
// };

// const PostApiComponent = ({ onAddTask }) => {
//   const [title, setTitle] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!title.trim()) return;
    
//     onAddTask({ title, completed: false });
//     setTitle('');
//   };

//   return (
//     <div>
//       <h2>Add New Task</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter task title"
//           required
//         />
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// };

// const App = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/tasks')
//       .then(response => {
//         setTasks(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the data!', error);
//       });
//   }, []);

//   const handleAddTask = (newTask) => {
//     axios.post('http://localhost:3001/api/tasks', newTask)
//       .then(response => {
//         setTasks([...tasks, response.data]);
//       })
//       .catch(error => {
//         console.error('There was an error adding the task!', error);
//       });
//   };

//   const handleDeleteTask = (taskId) => {
//     axios.delete(`http://localhost:3001/api/tasks/${taskId}`)
//       .then(() => {
//         setTasks(tasks.filter(task => task.id !== taskId));
//       })
//       .catch(error => {
//         console.error('There was an error deleting the task!', error);
//       });
//   };

//   const handleToggleTask = (taskId, completed) => {
//     axios.patch(`http://localhost:3001/api/tasks/${taskId}`, { completed })
//       .then(() => {
//         setTasks(tasks.map(task =>
//           task.id === taskId ? { ...task, completed } : task
//         ));
//       })
//       .catch(error => {
//         console.error('There was an error updating the task!', error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>To-Do List</h1>
//       <PostApiComponent onAddTask={handleAddTask} />
//       <TodoList
//         tasks={tasks}
//         onDelete={handleDeleteTask}
//         onToggle={handleToggleTask}
//       />
//     </div>
//   );
// };

// export default App;

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
