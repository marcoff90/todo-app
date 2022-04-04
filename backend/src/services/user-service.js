import UserRepository from "../repositories/user-repository";

const create = async (user) => {
  let savedUser = await UserRepository.create(user);
  return savedUser;
};

const isUserNameTaken = async (username) => {
  return await UserRepository.findByUsername(username) !== null;
};

const isEmailUsed = async (email) => {
  return await UserRepository.findByEmail(email) !== null;
};

const login = async (user) => {
  let userInDb = await UserRepository.findByUsername(user.username);
  let doesPasswordMatch = userInDb !== null ? user.password === userInDb.password : false;
  return doesPasswordMatch ? userInDb : null;
};

const findById = async (id) => {
  return await UserRepository.findById(id);
};

const completeTask = async (userId) => {
  let user = await UserRepository.findById(userId);
  user.completedTasks = user.completedTasks + 1;
  await user.save();
};

const findTopTenSolvers = async () => {
  return await UserRepository.findTopTenSolvers();
};

export default {
  create,
  isEmailUsed,
  isUserNameTaken,
  login,
  findById,
  completeTask,
  findTopTenSolvers
};
