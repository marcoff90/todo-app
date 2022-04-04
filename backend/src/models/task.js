import sequelize from "../config/database";
import DataTypes from "sequelize";

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isForGrab: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGrabbed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: Math.floor(Date.now() / 1000)
  },
  updatedAt: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: null
  },
  deadline: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: Math.floor(Date.now() / 1000 + 86400)
  },
  deletedAt: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: null
  },
  notificationSent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {timestamps: false});

export default Task;

