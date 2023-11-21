const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const ProjectModel = require("./Project.model");
const UserModel = require("./User.model");

const TeamModel = sequelize.define(
  "teams",
  {
    t_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pro_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "teams",
  }
);

TeamModel.belongsTo(ProjectModel, { foreignKey: "pro_id" });

ProjectModel.hasMany(TeamModel, { foreignKey: "pro_id" });

TeamModel.belongsTo(UserModel, { foreignKey: "user_id" });

UserModel.hasMany(TeamModel, { foreignKey: "user_id" });

module.exports = TeamModel;
