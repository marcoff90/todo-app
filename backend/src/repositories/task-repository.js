import Task from "../models/task";
import {Op} from "sequelize";
import sequelize from "../config/database";
import "core-js/stable";
import "regenerator-runtime/runtime";

const create = async (task) => {
  let savedTask = await Task.create(task);
  return savedTask;
};

const findAllWhereOwnerOrGrabber = async (userId) => {
  return await Task.findAll({
    where: {
      [Op.or]: [
        {owner_id: userId},
        {grabber_id: userId}
      ],
      deletedAt: null
    },
    attributes: {
      exclude: ['deletedAt', 'notificationSent']
    },
    order: [['isDone'], sequelize.literal('deadline DESC')]
  });
};

const findById = async (taskId) => {
  return await Task.findOne({
    where: {
      id: taskId,
      deletedAt: null
    },
    attributes: {
      exclude: ['deletedAt', 'notificationSent']
    }
  })
};

const findAllForGrabs = async (userId) => {
  return await Task.findAll({
    where: {
      [Op.not]: {owner_id: userId},
      isForGrab: true,
      isDone: false,
      isGrabbed: false,
      deletedAt: null
    },
    attributes: {
      exclude: ['deletedAt', 'notificationSent']
    },
    order: sequelize.literal('deadline ASC')
  });
};

const findAllToBeDoneInHour = async () => {
  return await Task.findAll({
    where: {
      isDone: false,
      deletedAt: null,
      notificationSent: false,
      deadline: {
        [Op.lte]: Math.floor(Date.now() / 1000 + 3600)
      }
    },
    attributes: {
      exclude: ['deletedAt', 'notificationSent']
    }
  });
};

const findAllDayAfterDeadline = async () => {
  return await Task.findAll({
    where: {
      isDone: false,
      deletedAt: null,
      notificationSent: true,
      deadline: {
        [Op.lte]: Math.floor(Date.now() / 1000 - 86400)
      }
    },
    attributes: {
      exclude: ['deletedAt', 'notificationSent']
    }
  });
};

export default {
  create,
  findAllWhereOwnerOrGrabber,
  findById,
  findAllForGrabs,
  findAllToBeDoneInHour,
  findAllDayAfterDeadline
};
