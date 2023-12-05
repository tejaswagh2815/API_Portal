const { Op } = require("sequelize");
const sequelize = require("../config/db.config");
const ProjectModel = require("../models/Project.model");
const TeamModel = require("../models/Team.model");
const getResponse = require("../utils/respones");
const getQueryParams = require("../utils/getQueryParams");

async function createProject(data) {
  try {
    const respones = await sequelize.transaction(async (t) => {
      const crtProj = await ProjectModel.create(
        {
          pro_name: data.pro_name,
          dev_url: data.dev_url,
          prod_url: data.prod_url,
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

async function getAll(queryParams) {
  try {
    const { pageNo, pageSize, offset, search } = getQueryParams(queryParams);

    const count = await ProjectModel.count();
    console.log(search);

    const data = await ProjectModel.findAll({
      where: {
        pro_name: {
          [Op.like]: `%${search}%`,
        },
      },
      include: [
        {
          model: TeamModel,
        },
      ],
      offset,
      limit: pageSize,
    });

    if (!data) {
      return getResponse(404, false, "no project found");
    } else {
      return getResponse(200, true, "all project", data, {
        pageNo,
        pageSize,
        count: count,
      });
    }
  } catch (error) {
    throw error;
  }
}

async function getProjecById(data) {
  try {
    let { id } = data;
    const record = await ProjectModel.findOne({
      where: {
        pro_id: id,
      },
      include: [
        {
          model: TeamModel,
        },
      ],
    });
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

async function editProject(data) {
  try {
    let { pro_id, pro_name, dev_url, prod_url } = data;
    console.log(data);
    let record = await ProjectModel.update(
      { pro_name, dev_url, prod_url },
      {
        where: {
          pro_id,
        },
      }
    );

    if (record) {
      return getResponse(200, true, "Project is updated");
    } else {
      return getResponse(404, false, " project not found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProject,
  getAll,
  getProjecById,
  deleteById,
  editProject,
};
