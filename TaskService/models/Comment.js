const commentSchema = new Schema({
    taskId: {
      type: mongoose.Types.ObjectId,
      ref: 'Task',
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
    },
    replies: [{
      type: mongoose.Types.ObjectId,
      ref: 'Reply'
    }]
  });
  
  module.exports = mongoose.model('Comment', commentSchema);
  