const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../models/taskModel');
const { validateTaskData } = require('../middleware/validateTask');

async function getTasks(req, res, next) {
  try {
    const status = req.query.status;
    const tasks = await getAllTasks(status);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
}

async function getTask(req, res, next) {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) {
      return next({ statusCode: 404, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

async function createTaskHandler(req, res, next) {
  try {
    const validation = validateTaskData(req.body);
    if (!validation.success) {
      return next({ statusCode: 400, message: validation.message });
    }

    const task = await createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

async function updateTaskHandler(req, res, next) {
  try {
    const validation = validateTaskData(req.body);
    if (!validation.success) {
      return next({ statusCode: 400, message: validation.message });
    }

    const affectedRows = await updateTask(req.params.id, req.body);
    if (!affectedRows) {
      return next({ statusCode: 404, message: 'Task not found' });
    }
    const task = await getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

async function deleteTaskHandler(req, res, next) {
  try {
    const affectedRows = await deleteTask(req.params.id);
    if (!affectedRows) {
      return next({ statusCode: 404, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask: createTaskHandler,
  updateTask: updateTaskHandler,
  deleteTask: deleteTaskHandler
};
