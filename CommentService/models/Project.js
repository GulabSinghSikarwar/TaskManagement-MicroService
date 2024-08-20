const projectSchema = new Schema({
    name: {
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
    members: [{
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }],
    tasks: [{
      type: mongoose.Types.ObjectId,
      ref: 'Task'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Project', projectSchema);
  