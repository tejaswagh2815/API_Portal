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
          createby: data.id,
        },
        transaction: t,
      });

      userData.password = null;

      if (created) {
        return getResponse(201, true, "user created successfully", userData);
      } else {
        return getResponse(200, false, "email already exits");
      }
    });
    return resp;
  } catch (error) {
    throw error;
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
    throw error;
  }
}

async function getUserData(data) {
  try {
    const userData = await UserModel.findOne({
      where: {
        user_id: data.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (userData) {
      return getResponse(200, true, "user data found", userData);
    } else {
      return getResponse(400, false, "login fisrt and try agin");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteUser(data) {
  try {
    let { id } = data;

    let record = await UserModel.destroy({
      where: {
        user_id: id,
      },
    });

    if (record) {
      return getResponse(200, true, "User reomved");
    } else {
      return getResponse(404, false, "no data found");
    }
  } catch (error) {
    throw error;
  }
}

async function getAll() {
  try {
    let record = await UserModel.findAll();
    if (record) {
      return getResponse(200, true, "Users found", record);
    } else {
      return getResponse(404, false, "no user found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  login,
  getUserData,
  deleteUser,
  getAll,
};
