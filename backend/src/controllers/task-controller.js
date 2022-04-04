import UserService from "../services/user-service";
import ApiError from "../error/api-error";
import TaskService from "../services/task-service";

const storeTask = async (req, res, next) => {
  let task = req.body;
  let user = await UserService.findById(req.user.id);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    next(ApiError.badRequest("Task must be defined!"));

  } else if (!task.description) {
    next(ApiError.badRequest('Description must be provided!'));

  } else {
    let savedTask = await TaskService.create(task, user);
    res.json(savedTask);
  }
};

const showUsersTasks = async (req, res, next) => {
  let tasks = await TaskService.findAllWhereOwnerOrGrabber(req.user.id);
  res.json(tasks);
};

const showTask = async (req, res, next) => {
  let task = await TaskService.findById(req.params.taskId);

  if (!task) {
    next(ApiError.notFound('Task not found!'));

  } else {
    res.json(task);
  }
};

const updateTask = async (req, res, next) => {
  let task = await TaskService.findById(req.params.taskId);
  let updateTask = req.body;

  if (!task) {
    next(ApiError.notFound('Task not found!'));

  } else if (req.user.id !== task.owner_id) {
    next(ApiError.forbidden('Only owner of task can update task!'));

  } else if (task.isDone) {
    next(ApiError.forbidden("Completed tasks can't be updated!"))

  } else if (req.body.constructor === Object && Object.keys(req.body).length
      === 0) {
    next(ApiError.badRequest('Updated fields must be provided!'));

  } else {
    let updatedTask = await TaskService.updateTask(updateTask, task);
    res.json(updatedTask);
  }
};

const softDeleteTask = async (req, res, next) => {
  let task = await TaskService.findById(req.params.taskId);

  if (!task) {
    next(ApiError.notFound('Task not found!'));

  } else if (req.user.id !== task.owner_id) {
    next(ApiError.forbidden('Only owner can delete task!'));

  } else {
    let response = await TaskService.softDeleteTask(task);
    res.json(response);
  }
};

const showAllForGrabs = async (req, res, next) => {
  let tasks = await TaskService.findAllForGrabs(req.user.id);
  res.json(tasks);
};

const grabTask = async (req, res, next) => {
  let task = await TaskService.findById(req.body.id)
  let grabber = await UserService.findById(req.user.id);

  if (!req.body.id) {
    next(ApiError.badRequest('Task id must be provided!'))

  } else if (!task) {
    next(ApiError.notFound('Task not found!'));

  } else if (task.grabber_id !== null) {
    next(ApiError.badRequest('Task already grabbed!'));

  } else if (task.isDone) {
    next(ApiError.badRequest('Task is already done!'));

  } else if (!task.isForGrab) {
    next(ApiError.forbidden('Task is not for grabs!'));

  } else if (grabber.id === task.owner_id) {
    next(ApiError.forbidden('Grabbing own tasks is forbidden!'));

  } else {
    let response = await TaskService.setGrabber(task, grabber);
    res.json(response);
  }
};

const completeTask = async (req, res, next) => {
  let task = await TaskService.findById(req.body.id)
  if (!req.body.id) {
    next(ApiError.badRequest('Task id must be provided!'))

  } else if (!task) {
    next(ApiError.notFound('Task not found!'));

  } else if (task.isDone) {
    next(ApiError.badRequest('Task is already done!'));

  } else if (req.user.id === task.grabber_id || req.user.id === task.owner_id) {
    let response = await TaskService.completeTask(task, req.user.id);
    res.json(response);

  } else {
    next();
  }
};

export default {
  storeTask,
  showUsersTasks,
  showTask,
  updateTask,
  softDeleteTask,
  showAllForGrabs,
  grabTask,
  completeTask
};
