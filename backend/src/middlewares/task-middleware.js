import TaskService from "../services/task-service";
import UserService from "../services/user-service";
import sendMail from "../utils/mailer";

const taskMiddleware = async (res, req, next) => {
  let taskToBeDone = await TaskService.findAllToBeDoneInHour();
  let taskAfterDeadline = await TaskService.findAllDayAfterDeadline();
  await sendNotification(taskToBeDone);
  await completeTasks(taskAfterDeadline);
  next();
};

const sendNotification = async (taskToBeDone) => {
  if (taskToBeDone) {
    for (let i = 0; i < taskToBeDone.length; i++) {
      let owner = await UserService.findById(taskToBeDone[i].owner_id);
      let grabber = await UserService.findById(taskToBeDone[i].grabber_id);

      if (owner) {
        sendMail(owner.email);
      }
      if (grabber) {
        sendMail(grabber.email);
      }
      taskToBeDone[i].notificationSent = true;
      taskToBeDone[i].updatedAt = Math.floor(Date.now() / 1000);
      await taskToBeDone[i].save();
    }
  }
};

const completeTasks = async (taskAfterDeadline) => {
  if (taskAfterDeadline) {
    for (let i = 0; i < taskAfterDeadline.length; i++) {
      taskAfterDeadline[i].isDone = true;
      taskAfterDeadline[i].updatedAt = Math.floor(Date.now() / 1000);
      await taskAfterDeadline[i].save();
    }
  }
};

export default taskMiddleware;
