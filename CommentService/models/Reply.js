const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const replySchema = new Schema({
  commentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reply', replySchema);
