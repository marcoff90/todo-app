### ToDo application
- backend in express.js connected to mysql database
- users are registered with username, email and password
- after logging in, jwt token is generated and used through authentication middleware in order to allow users to get to endpoints only for registered users
- user can create a new task with just a description, the rest of the values is set to default values if not filled
- owner of the task can update any property of the task object
- owner can change the status of task 'isForGrab' to true and then the task is shared with other users who can 'grab task' and become the solver of the task
- each user has property of completed tasks which is incremented with every solved task
- top ten solvers are showed
- when the task is about to come to its deadline (1 hour), the notification email is sent
- when the task hasn't been updated (done or deadline changed) after 24 hours, the status is changed to done

[App on Heroku](https://todo-app-marcoff.herokuapp.com/)


### Set-up
- fork repo
- clone repo with https://github.com/marcoff90/todo-app.git
- open project and run 'npm install' in backend directory
- change .sample.env to .env and fill out the requirements to connect to mysql database, mailer and generate access token secret code


### Ideas to do
- add teams and share tasks with just teams
- add chat for teams
- add animations cascading for tasks
- completing tasks by moving them from one column to another

### [Backend Docs](backend.md)

![Alt Text](https://github.com/marcoff90/todo-app/blob/master/app_gif/ToDoApp-v10.gif)



