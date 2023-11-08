const sequelize = require("../config/db.config");
const ProjectModel = require("../models/Project.model");
const UserModel = require("../models/User.model");
const { all } = require("../routes/project.route");
const getResponse = require("../utils/respones");

async function create(data) {
  try {
    const respones = await sequelize.transaction(async (t) => {
      const crtProj = await ProjectModel.create(
        {
          pro_name: data.name,
          base_url: data.url,
          user_id: data.id,
        },
        { transaction: t }
      );

      if (crtProj) {
        return getResponse(201, true, "Project created", crtProj);
      } else {
        return getResponse(400, false, "project not created");
      }
    });

    return respones;
  } catch (error) {
    throw error;
  }
}

async function getAll() {
  try {
    const allProject = await ProjectModel.findAll();

    if (allProject) {
      return getResponse(200, true, "all project", allProject);
    } else {
      return getResponse(404, false, "no project found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { create, getAll };