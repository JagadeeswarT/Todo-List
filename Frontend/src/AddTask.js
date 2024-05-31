import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask;
