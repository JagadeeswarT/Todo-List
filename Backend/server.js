const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Task schema and model
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});
const Task = mongoose.model('Task', taskSchema);

// API routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const task = new Task({ title, completed });
    const newTask = await task.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/task/:taskID", async(req,res)=>{
  try{
      const id = req.params.taskID;
      console.log(id)
      const deletedTask = await Task.findOneAndDelete({ _id: id });
      res.status(200).json(deletedTask)

  }catch(error){
    res.status(400).json({ error: error.message });
  }
})
// Update task completion status
app.patch('/api/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { completed }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
