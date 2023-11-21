const sequelize = require("../config/db.config");
const ProjectModel = require("../models/Project.model");
const getResponse = require("../utils/respones");

async function createProject(data) {
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

    if (allProject.length > 0) {
      return getResponse(200, true, "all project", allProject);
    } else {
      return getResponse(404, false, "no project found");
    }
  } catch (error) {
    throw error;
  }
}

async function getProjecById(data) {
  try {
    let { id } = data;
    const record = await ProjectModel.findByPk(id);
    if (record) {
      return getResponse(200, true, "Project find", record);
    } else {
      return getResponse(400, false, "no project");
    }
  } catch (error) {
    throw error;
  }
}

async function deleteById(data) {
  try {
    let { id } = data;
    let record = await ProjectModel.destroy({
      where: {
        pro_id: id,
      },
    });

    if (record) {
      return getResponse(200, true, "Project was deleted");
    } else {
      return getResponse(404, false, " project not found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { createProject, getAll, getProjecById, deleteById };
