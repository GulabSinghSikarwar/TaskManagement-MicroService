const mongoose = require('mongoose');
const { Schema } = mongoose;

const subtaskSchema = new Schema({
  parentTaskId: {
    type: mongoose.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subtask', subtaskSchema);
