import axios from "axios";
import {toast} from "react-toastify";

const updateTask = (id, updatedTask, navigate) => {
  let url = 'https://todo-my-api.herokuapp.com/api/users/tasks/' + id;
  axios.put(url, updatedTask, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(() => {
    successToast('Task updated!');
    getUsersTasks(navigate);
  })
  .catch(err => {
    errorToast(err);
    getUsersTasks(navigate);
  })
};

const deleteTask = (id, navigate) => {
  let url = 'https://todo-my-api.herokuapp.com/api/users/tasks/' + id;
  axios.delete(url, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(() => {
    successToast('Task deleted!');
    getUsersTasks(navigate);
  })
  .catch(err => {
    errorToast(err);
  })
};

const completeTask = (id, navigate) => {
  let url = 'https://todo-my-api.herokuapp.com/api/users/tasks/' + id + '/completion';
  axios.put(url, {id: id}, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(() => {
    successToast('Task completed!');
    getUsersTasks(navigate);
  })
  .catch(err => {
    errorToast(err);
  })
};

const grabTask = (id, navigate) => {
  let url = 'https://todo-my-api.herokuapp.com/api/tasks/' + id;
  axios.put(url, {id: id}, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(() => {
    successToast('Task grabbed!');
    getUsersTasks(navigate);
  })
  .catch(err => {
    errorToast(err);
  })
};

const offerForGrabs = (id, navigate) => {
  let url = 'https://todo-my-api.herokuapp.com/api/users/tasks/' + id;
  axios.put(url, {isForGrab: true}, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(() => {
    successToast('Task shared!');
    getUsersTasks(navigate);
  })
  .catch(err => {
    errorToast(err);
  })
}

const getUsersTasks = (navigate) => {
  axios.get('https://todo-my-api.herokuapp.com/api/users/tasks', {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(res => {
    navigate('/my-tasks', {state: {data: res.data}});
  })
  .catch(error => {
    navigate('/');
    errorToast(error);
  })
};

const getTasksForGrabs = (navigate) => {
  axios.get('https://todo-my-api.herokuapp.com/api/tasks', {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(res => {
    navigate('/grab-a-task', {state: {data: res.data}});
  })
  .catch(error => {
    navigate('/');
    errorToast(error);
  })
};

const loginUser = (username, password, navigate) => {
  let user = {
    username,
    password
  };

  axios
  .post('https://todo-my-api.herokuapp.com/api/login', user)
  .then(res => {
    window.localStorage.setItem('token', res.data.token);
    navigate('/my-tasks');
  })
  .catch(err => {
    window.localStorage.setItem('token', null);
    errorToast(err);
  })
};

const addTask = (description, deadline, navigate) => {
  let task = {
    description: description,
    deadline: deadline,
  }

  axios.post('https://todo-my-api.herokuapp.com/api/users/tasks', task, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  .then(res => {
    navigate('/my-tasks');
  })
  .catch(err => {
    errorToast(err);
  })
};

const registerUser = (username, email, password, navigate) => {
  let user = {
    username,
    email,
    password
  };
  axios
  .post('https://todo-my-api.herokuapp.com/api/registration', user)
  .then(res => {
    navigate('/login', {state: true})

  })
  .catch(err => {
    errorToast(err)
  });
};

const errorToast = (err) => {
  return toast.error(err.response.data.error, {
    position: "top-center",
    autoClose: 3000,
    theme: 'colored'
  });
};

const successToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    theme: 'colored'
  });
};

export default {
  updateTask,
  deleteTask,
  completeTask,
  grabTask,
  offerForGrabs,
  getTasksForGrabs,
  getUsersTasks,
  loginUser,
  addTask,
  registerUser
};
