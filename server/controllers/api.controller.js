const sequelize = require("../config/db.config");
const ApiModel = require("../models/Api.model");
const ApiParamModel = require("../models/ApiParm.model");
const getResponse = require("../utils/respones");

async function createApi(data) {
  try {
    const respo = await sequelize.transaction(async (t) => {
      const crtApi = await ApiModel.create(
        {
          pro_id: data.pro_id,
          endpoint: data.endpoint,
          title: data.title,
          description: data.description,
          reqtype: data.reqtype,
          createBy: data.user_id,
        },
        { transaction: t }
      );

      if (!crtApi) {
        return getResponse(400, false, "API not created");
      } else {
        const parameters = data.params.map((item) => {
          return {
            ...item,
            api_id: crtApi.api_id,
          };
        });

        const addParams = await ApiParamModel.bulkCreate(parameters, {
          transaction: t,
        });

        if (addParams) {
          return getResponse(201, true, "API created");
        } else {
          return getResponse(400, false, "parameter not added");
        }
      }
    });

    return respo;
  } catch (error) {
    throw error;
  }
}

async function apiList() {
  try {
    const allApi = await ApiModel.findAll({
      include: [
        {
          model: ApiParamModel,
        },
      ],
    });
    if (allApi.length > 0) {
      return getResponse(200, true, "api list", allApi);
    } else {
      return getResponse(404, false, "apis list not found");
    }
  } catch (error) {
    throw error;
  }
}

async function deleteApi(data) {
  try {
    let { id } = data;
    console.log(id);
    let record = await ApiParamModel.destroy({
      where: {
        api_id: id,
      },
    });
    if (record) {
      let rec = await ApiModel.destroy({
        where: {
          api_id: id,
        },
      });
      if (rec) {
        return getResponse(200, true, "api deleted..");
      } else {
        return getResponse(400, false, "not able to detele");
      }
    } else {
      return getResponse(404, false, "api not found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { createApi, apiList, deleteApi };
