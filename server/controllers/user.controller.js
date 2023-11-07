const sequelize = require("../config/db.config");
const UserModel = require("../models/User.model");
const getResponse = require("../utils/respones");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      const isPasswordMatch = await bcrypt.compare(
        data.password,
        userData.password
      );

      if (!isPasswordMatch) {
        return getResponse(400, false, "password not match");
      } else {
        const { user_id, user_name, user_email, user_roles, user_type } =
          userData;
        const jwtsec = process.env.JWT_SECRET;
        const token = jwt.sign({ user_id }, jwtsec, { expiresIn: "1d" });

        const newData = {
          user_id,
          user_name,
          user_email,
          user_roles,
          user_type,
          token,
        };
        return getResponse(200, true, "login successfully", newData);
      }
    } else {
      return getResponse(401, false, "email not exists");
    }
  } catch (error) {
    console.error("user : login : Controller : ", error);
  }
}

module.exports = {
  register,
  login,
};
