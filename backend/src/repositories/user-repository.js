import User from "../models/user";
import sequelize from "../config/database";
import "core-js/stable";
import "regenerator-runtime/runtime";

const create = async (user) => {
  let savedUser = await User.create(user);
  return savedUser;
};

const findByUsername = async (username) => {
  return await User.findOne({
    where: {
      username: username
    }
  });
};

const findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email
    }
  });
};

const findById = async (id) => {
  return await User.findOne({
    where: {
      id: id
    }
  });
};

const findTopTenSolvers = async () => {
  return await User.findAll({
    attributes: {
      exclude: ['id', 'email', 'password']
    },
    order: sequelize.literal('completedTasks DESC'),
    limit: 10
  });
};

export default {
  create,
  findByEmail,
  findByUsername,
  findById,
  findTopTenSolvers
};

