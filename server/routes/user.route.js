const express = require("express");
const { register, login } = require("../controllers/user.controller");

const route = express.Router();

route.post("/register", (req, res) => {
  register(req.body)
    .then((data) => res.status(data.status).json(data.data))
    .catch((err) => {
      console.error("auth : register : ", err);
      res.status(400).json(err);
    });
});

route.post("/login", (req, res) => {
  login(req.body)
    .then((data) => res.status(data.status).json(data.data))
    .catch((err) => {
      console.error("auth : Login : ", err);
      res.status(400).json(err);
    });
});

module.exports = route;
