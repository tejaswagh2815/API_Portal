const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const ProjectModel = require("./Project.model");
const UserModel = require("./User.model");
const ApiParamModel = require("./ApiParm.model");

const ApiModel = sequelize.define(
  "apitable",
  {
    api_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endpoint: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: { type: DataTypes.STRING(50), allowNull: true },
    reqtype: { type: DataTypes.INTEGER, allowNull: false },
    createBy: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "apitable",
  }
);

ApiModel.belongsTo(ProjectModel, { foreignKey: "pro_id" });
ProjectModel.hasMany(ApiModel, { foreignKey: "pro_id" });

ApiModel.belongsTo(UserModel, { foreignKey: "createBy" });
UserModel.hasMany(ApiModel, { foreignKey: "createBy" });

module.exports = ApiModel;
