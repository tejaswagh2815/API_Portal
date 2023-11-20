const express = require("express");
const verifyUser = require("../middleware/auth");
const { createProject, getAll } = require("../controllers/project.controller");

const route = express.Router();

route.post("/createProject", verifyUser, (req, res) => {
  createProject(req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

route.get("/allProject", verifyUser, (req, res) => {
  getAll()
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => res.status(404).json(err.errors));
});

module.exports = route;
