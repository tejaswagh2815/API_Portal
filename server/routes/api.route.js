const express = require("express");
const {
  createApi,
  apiList,
  deleteApi,
} = require("../controllers/api.controller");

const route = express.Router();

route.post("/createapi", (req, res) => {
  createApi(req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

route.get("/apilist", (req, res) => {
  apiList()
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

route.delete("/delete/:id", (req, res) => {
  deleteApi(req.params)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = route;
