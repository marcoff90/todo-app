import {Router} from 'express';
import TaskController from "../controllers/task-controller";

const TaskRouter = Router();

TaskRouter.post('/api/users/tasks', TaskController.storeTask);

TaskRouter.get('/api/users/tasks', TaskController.showUsersTasks);

TaskRouter.get('/api/users/tasks/:taskId', TaskController.showTask);

TaskRouter.put('/api/users/tasks/:taskId', TaskController.updateTask);

TaskRouter.delete('/api/users/tasks/:taskId', TaskController.softDeleteTask);

TaskRouter.get('/api/tasks', TaskController.showAllForGrabs);

TaskRouter.put('/api/tasks/:taskId', TaskController.grabTask);

TaskRouter.put('/api/users/tasks/:taskId/completion',
    TaskController.completeTask);

export default TaskRouter;
