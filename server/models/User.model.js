const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const UserModel = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_roles: {
      type: DataTypes.INTEGER,
      // defaultValue: 1,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    createby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = UserModel;
