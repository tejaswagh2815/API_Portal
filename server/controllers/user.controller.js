const sequelize = require("../config/db.config");
const UserModel = require("../models/User.model");
const getResponse = require("../utils/respones");
const bcrypt = require("bcrypt");

async function register(data) {
  try {
    const resp = sequelize.transaction(async (t) => {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const [userData, created] = await UserModel.findOrCreate({
        where: {
          user_email: data.email,
        },
        defaults: {
          user_name: data.name,
          user_email: data.email,
          password: hashedPassword,
          user_roles: data.role,
          user_type: data.type,
        },
        transaction: t,
      });

      userData.password = null;

      if (created) {
        return getResponse(201, true, "user created successfully", userData);
      } else {
        return getResponse(200, false, "user not created");
      }
    });
    return resp;
  } catch (error) {
    console.error("user : Register : Controller : ", error);
  }
}

async function login(data) {
  try {
    const userData = await UserModel.findOne({
      where: {
        user_email: data.email,
      },
    });

    if (userData) {
      return getResponse(200, true, "user found", userData);
    } else {
      return getResponse(404, false, `${data.email} this email not registered`);
    }
  } catch (error) {
    console.error("user : login : Controller : ", error);
  }
}

module.exports = {
  register,
  login,
};
