Topics:
- [Error handling](#error-handling)
- [Authorization middleware](#authorization-middleware)
- [User](#user)
- [User controller](#user-controller)
- [Task](#task)
- [Task controller](#task-controller)
- [Task middleware](#task-middleware)

### Error handling
- ApiError object
    - code = status code
    - message = error message
- each static function is named after status code and returns ApiError object with corresponding status code and message passed as a parameter
- each controller in case of an error calls these functions within next function which 'ends up' in error handler middleware
```
const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json('Something went wrong');
};
```

### Authorization middleware
- token is sent in headers as an authentication bearer token
- no token -> access denied through ApiError
- the token is then split and user is verified
- returns user from payload in req.user
- if token is invalid returns ApiError with bad request
- user id in each endpoint is get from req.user

### User
- properties
    - id
    - Username
    - email
    - password
    - completedTasks

### User Controller
| POST | '/api/registration'
- storeUser()
    - accepts username, email and password in request body
    - checkpoints
        - empty req.body -> bad request
        - no username/email/password -> bad request
        - password not matching regex -> bad request
        - username/email already existing -> conflict
        - username shorter than 5 characters -> bad request
    - if all checkpoints passed successfully the user is created through UserService where the password is hashed through bcrypt package
    - returns id and username of saved user

| POST | '/api/login'
- showLogin()
    - accepts username and password in request body
    - checkpoints
        - no username/password -> bad request
    - if checkpoints passed successfully the request is sent to user service where user is found by username, password compared to hashed password through bcrypt
    - if found user isn't null access token is generated through token-generator util and sent as a response

| GET | 'api/users'
- showTopTenSolvers()
    - accessible only for authorized users
    - sends request to repository through service where list of ten users is generated
        - ordered by number of completed tasks DESC
        - returns only username and number of completed tasks for each user


### Task
- properties
    - id
    - description
    - isDone
    - isForGrab
    - isGrabbed
    - createdAt
    - updatedAt
    - deletedAt
    - deadline
    - notificationSent

### Task controller
- accessible for authorized users
- whenever shows tasks hidden deletedAt, notificationSent properties
- returns only tasks where deletedAt is null
    - all tasks are still saved in db, they're just soft deleted

| POST | '/api/users/tasks'
- store task()
    - checkpoints
        - no request body -> bad request
        - no description -> bad request
    - if checkpoints has passed the task is created through task service where owner of the task is set through setter defined in db-relationships.js


| GET | '/api/users/tasks'
- showUsersTasks()
    - tasks are found through service -> repository
        - if tasks are found returns all tasks where user is either owner or a grabber
        - sorted by isDone (false first) then deadline
        - if tasks are empty returns error

| GET | '/api/users/tasks/:taskId'
- showTask()
    - checkpoints
        - task not found -> 404
    - returns task


| PUT | '/api/users/tasks/:taskId'
- updateTask()
    - checkpoints
        - task not found -> 404
        - user from request doesn't match owner id of the task -> forbidden
        - task is done -> forbidden
        - no body -> bad request
    - sends the body task and task found through db to service
        - compares entries of both objects
            - when key is matching overwrites the value
        - if the owner has changed the task to done increments number of tasks done
```
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
```

| DELETE | '/api/users/tasks/:taskId'
- softDeleteTask()
    - checkpoints
        - task not found -> 404
        - user from request doesn't match owner id of the task -> forbidden
    - sets deletedAt at current timestamp

| GET | '/api/tasks'
- showAllForGrabs()
    - checkpoints
        - length of returned array of tasks = 0 -> no tasks found
    - returns all tasks where
        - isForGrab: true,
        - isDone: false,
        - isGrabbed: false,
        - deletedAt: null
        - user isn't owner of the task
- the user will be able to choose a task which he wants to complete

| PUT | '/api/tasks/:taskId'
- grabTask()
    - checkpoints
        - task not found -> 404
        - task.isGrabbed = true -> in case the task has been grabbed before the user has made the request
        - task is done -> same as with grabbed
        - task owner isn't task grabber
    - sets grabber of the task as the user found through req.user
        - sets new updated at current date
        - is for grab to false -> won't be showing in the list
        - isGrabbed to true
    - returns grabber username as grabber

| PUT | '/api/users/tasks/:taskId/completion'
- completeTask()
    - checkpoints
        - task not found -> 404
        - task already done -> 400
    - if user is either owner or grabber sends request to service
        - sets is done to true
        - update at at current date
        - increments users completed tasks
    - if the user didn't match owner or grabber goes to next to error handler


### Task middleware
- firstly loads all tasks which are undone, not deleted and their deadline is about to happen in next hour
- loads all tasks which are undone and over 24 hours after deadline
- divided into two functions
    - sendNotification()
        - takes undone tasks with deadline in under hour directly from repository
        - if there's any result from the repository
            - loops through the array of tasks
            - find owner and grabber
            - sends owner an email notification that task deadline is coming and if not changed, in 24 hours will be set to done
            - if grabber is not null -> same for owner
            - sets notificationSent to true which achieves the same task won't be notified twice through conditioning in repository
    - completeTasks()
        - takes array of unfinished tasks with over 24 hours after deadline
            - if any result
            - loops through array
            - sets each task to done and updates updatedAt


