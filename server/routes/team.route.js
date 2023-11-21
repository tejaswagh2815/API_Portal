const express = require("express");
const verifyUser = require("../middleware/auth");
const { addNew, removeMember } = require("../controllers/team.controller");

const route = express.Router();

route.post("/team", verifyUser, (req, res) => {
  addNew(req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

route.delete("/team/:id", verifyUser, (req, res) => {
  removeMember(req.params)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => res.status(404).json(err.errors));
});

module.exports = route;
