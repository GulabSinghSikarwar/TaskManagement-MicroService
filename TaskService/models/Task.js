const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignee: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  labels: [{
    type: String
  }],
  dueDate: {
    type: Date
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: 'Project'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Comment'
  }],
  attachments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Attachment'
  }],
  subtasks: [{
    type: mongoose.Types.ObjectId,
    ref: 'Subtask'
  }],
  history: [{
    type: mongoose.Types.ObjectId,
    ref: 'TaskHistory'
  }]
});

module.exports = mongoose.model('Task', taskSchema);
