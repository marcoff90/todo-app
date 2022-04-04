import express from 'express';
import createRelationships from "./config/db-relationships";
import apiErrorHandler from "./middlewares/api-error-handler";
import RegisterRouter from "./routers/register-router";
import TaskRouter from "./routers/task-router";
import UserRouter from "./routers/user-router";
import TaskMiddleware from "./middlewares/task-middleware";
import AuthorizationMiddleware from "./middlewares/authorization-middleware";
import cors from "cors";

const app = express();

app.use(cors());

createRelationships();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(RegisterRouter);
app.use(AuthorizationMiddleware);
app.use(TaskMiddleware);
app.use(TaskRouter);
app.use(UserRouter);
app.use(apiErrorHandler);

app.listen(process.env.PORT || 3001);
