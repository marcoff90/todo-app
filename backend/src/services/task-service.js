import TaskRepository from "../repositories/task-repository";
import UserService from "./user-service";

const create = async (task, user) => {
  task.deadline = task.deadline === null ? Math.floor(Date.now() / 1000 + 86400)
      : task.deadline;
  let savedTask = await TaskRepository.create(task);
  await savedTask.setOwner(user);
  return savedTask;
};

const findAllWhereOwnerOrGrabber = async (userId) => {
  return await TaskRepository.findAllWhereOwnerOrGrabber(userId);
};

const findById = async (taskId) => {
  return await TaskRepository.findById(taskId);
};

const updateTask = async (updateTask, task) => {
  for (const [updateKey, updateValue] of Object.entries(updateTask)) {
    for (const [key, value] of Object.entries(task.dataValues)) {
      if (updateKey === key) {
        task[key] = updateValue;
      }
    }
  }
  task.updatedAt = Math.floor(Date.now() / 1000);

  if (task.isDone) {
    await UserService.completeTask(task.owner_id);
  }
  await task.save();
  return task;
};

const softDeleteTask = async (task) => {
  task.deletedAt = Math.floor(Date.now() / 1000);
  await task.save();
  return {deletedAt: task.deletedAt};
};

const findAllForGrabs = async (userId) => {
  return await TaskRepository.findAllForGrabs(userId);
};

const setGrabber = async (task, grabber) => {
  await task.setGrabber(grabber);
  task.updateAt = Math.floor(Date.now() / 1000);
  task.isForGrab = false;
  task.isGrabbed = true;
  await task.save();
  return {grabber: grabber.username};
};

const completeTask = async (task, userId) => {
  task.isDone = true;
  task.updateAt = Math.floor(Date.now() / 1000);
  await UserService.completeTask(userId);
  await task.save();
  return task;
};

const findAllToBeDoneInHour = async () => {
  return await TaskRepository.findAllToBeDoneInHour();
};

const findAllDayAfterDeadline = async () => {
  return await TaskRepository.findAllDayAfterDeadline();
};

export default {
  create,
  findAllWhereOwnerOrGrabber,
  findById,
  updateTask,
  softDeleteTask,
  findAllForGrabs,
  setGrabber,
  completeTask,
  findAllDayAfterDeadline,
  findAllToBeDoneInHour
};
