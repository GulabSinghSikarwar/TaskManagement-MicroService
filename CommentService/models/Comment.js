const { Schema, Types } = require('mongoose')
const mongoose = require('mongoose')
const commentSchema = new Schema({
  taskId: {
    type: Types.ObjectId,
    ref: 'Task',
    required: true
  },

  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  profilePicture: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [{
    type: Types.ObjectId,
    ref: 'Reply'
  }]
});

module.exports = mongoose.model('Comment', commentSchema);
