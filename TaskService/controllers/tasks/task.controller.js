
const { sendToKafka } = require('../../services/kafka/producer.service')
const Task = require('../../models/Task')


export const createTask = async (req, res) => {
    try {
        const { taskDetails, userId } = req.body
        const task = new Task({ title: taskDetails.title, content: taskDetails.content, status: taskDetails.status, userId: userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.userId.toString() !== req.body.userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        task.title = req.body.title;
        task.content = req.body.content;
        task.status = req.body.status;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task' });
    }
}

export const updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status, userId } = req.body;
    // const userId = req.user._id; // Assuming user is attached to req

    try {
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        task.status = status;
        task.updatedAt = Date.now();
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task status', error });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        logger.debug(`Task to be deleted: ${task}\nUserID: ${req.body.userId}\nSame User ID: ${task.userId.toString()} === ${req.body.userId}, ${task.userId.toString() === req.body.userId}`);
        if (task.userId.toString() !== req.body.userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted', task });
    } catch (error) {
        logger.error(`Error deleting task: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}