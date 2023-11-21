const sequelize = require("../config/db.config");
const TeamModel = require("../models/Team.model");
const getResponse = require("../utils/respones");

exports.addNew = async (data) => {
  try {
  } catch (error) {}
};

async function addNew(data) {
  try {
    const resp = sequelize.transaction(async (t) => {
      const { pro_id, user_id } = data;

      const [team, created] = await TeamModel.findOrCreate({
        where: {
          pro_id,
          user_id,
        },
        defaults: {
          pro_id,
          user_id,
        },
        transaction: t,
      });

      if (!created) {
        return getResponse(400, true, "team member already exits");
      } else {
        return getResponse(201, true, "team member added", team);
      }
    });
    return resp;
  } catch (error) {
    throw error;
  }
}

async function removeMember(data) {
  try {
    let { id } = data;

    let record = await TeamModel.destroy({
      where: {
        t_id: id,
      },
    });

    if (record) {
      return getResponse(200, true, "Team member reomved");
    } else {
      return getResponse(404, false, "team member not there");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { addNew, removeMember };
