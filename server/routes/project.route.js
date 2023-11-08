const express = require("express");
const verifyUser = require("../middleware/auth");
const { create, getAll } = require("../controllers/project.controller");

const route = express.Router();

route.post("/addporj", verifyUser, (req, res) => {
  create(req.body)
    .then((data) => {
      console.log(data);
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

route.get("/allproj", verifyUser, (req, res) => {
  getAll()
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = route;
