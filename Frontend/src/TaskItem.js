import React from 'react';

const TaskItem = ({ task, deleteTask, toggleTaskCompletion }) => {
  const handleCheckboxChange = () => {
    toggleTaskCompletion(task._id, !task.completed);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
      />
      <span>{task.title}</span>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
