const taskHistorySchema = new Schema({
    taskId: {
      type: mongoose.Types.ObjectId,
      ref: 'Task',
      required: true
    },
    action: {
      type: String,
      required: true
    },
    actor: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    changes: {
      type: Map,
      of: String
    }
  });
  
  module.exports = mongoose.model('TaskHistory', taskHistorySchema);
  