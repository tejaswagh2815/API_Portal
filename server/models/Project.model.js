const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const UserModel = require("./User.model");

const ProjectModel = sequelize.define(
  "projects",
  {
    pro_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pro_name: { type: DataTypes.STRING(50), allowNull: false },
    dev_url: { type: DataTypes.STRING(50), allowNull: true },
    prod_url: { type: DataTypes.STRING(50), allowNull: true },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    tableName: "projects",
  }
);

ProjectModel.belongsTo(UserModel, { foreignKey: "user_id" });

UserModel.hasMany(ProjectModel, { foreignKey: "user_id" });

module.exports = ProjectModel;
