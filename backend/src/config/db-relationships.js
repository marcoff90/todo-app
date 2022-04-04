import User from "../models/user";
import Task from "../models/task";
import sequelize from "./database";

const createRelationships = () => {
  Task.belongsTo(User, {
    as: 'owner',
    foreignKey: 'owner_id',
    setOwner(owner) {
      this.setDataValue('owner', owner);
    }
  });

  Task.belongsTo(User, {
    as: 'grabber',
    foreignKey: 'grabber_id',
    setGrabber(grabber) {
      this.setDataValue('grabber', grabber);
    }
  });

  User.hasMany(Task, {
    as: 'owner',
    foreignKey: 'owner_id'
  });

  User.hasMany(Task, {
    as: 'grabber',
    foreignKey: 'grabber_id'
  });

  sequelize.sync()
  .then(res => {
    console.log(res);
  });
};

export default createRelationships;
