const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const ApiModel = require("./Api.model");

const ApiParamModel = sequelize.define(
  "parms",
  {
    pm_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    api_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(20), allowNull: false },
    description: { type: DataTypes.STRING(50), allowNull: true },
    datatype: { type: DataTypes.STRING(50), allowNull: false },
    parmtype: { type: DataTypes.INTEGER, allowNull: false },
    example: { type: DataTypes.STRING(40), allowNull: true },
  },
  {
    tableName: "parms",
  }
);

ApiParamModel.belongsTo(ApiModel, { foreignKey: "api_id" });

ApiModel.hasMany(ApiParamModel, { foreignKey: "api_id" });

module.exports = ApiParamModel;
