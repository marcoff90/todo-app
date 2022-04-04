import sequelize from "../config/database";
import DataTypes from "sequelize";

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completedTasks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {timestamps: false});

export default User;
