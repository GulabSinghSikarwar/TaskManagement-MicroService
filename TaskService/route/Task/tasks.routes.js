const express = require('express');
const router = express.Router();
// const User = require('../../models/User')
const Task = require('../../models/Task')
const { Types, default: mongoose } = require('mongoose')
const { ObjectId } = require('mongodb');
const { formatTaskStatus, formatAllTasks } = require('../task.util')
const { updateTaskStatus, updateTask, deleteTask, createTask } = require('../../controllers/tasks/task.controller');
const { logger } = require('../../services/logger.service');
const commentRouter = require('../commentRoutes/comments.routes')
const replyRouter = require('../repliesRoutes/replies.routes')
// const commentController = require('../../controllers/Tasks/taskComments/comment.controller')
// Create a new task

router.use('/comments', commentRouter)
router.use('/replies', replyRouter)
router.post('/', createTask);

// Get all tasks for a user
router.get('/:id', async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    try {
        const tasks = await Task.aggregate([
            {
              $match: { userId: userId }
            },
            {
              $group: {
                _id: "$status",
                tasks: { $push: "$$ROOT" } // use $$ROOT to include the entire document
              }
            },
            {
              $project: {
                _id: 0,
                columnId: "$_id",
                title: {
                  $switch: {
                    branches: [
                      { case: { $eq: ["$_id", "Pending"] }, then: "Pending" },
                      { case: { $eq: ["$_id", "Progress"] }, then: "Progress" },
                      { case: { $eq: ["$_id", "Completed"] }, then: "Completed" }
                    ]
                  }
                },
                tasks: 1 // include the tasks array in the output
              }
            }
          ]);
        logger.info(` task ----: ${JSON.stringify(tasks)}`)
        
        const allTasks = await Task.find({
            userId: userId
        })
        const response = {
            tasks: formatAllTasks(allTasks),
            columns: formatTaskStatus(tasks)
        }

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

// // Get a single task
// router.get('/:id', async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     if (task.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching task' });
//   }
// });

// Update a task
router.patch('/:id', updateTask);


router.patch('/:taskId/status', updateTaskStatus);

router.delete('/:id', deleteTask);

// router.use('/:id/comments', commentController.fetchAllcomments)


module.exports = router;