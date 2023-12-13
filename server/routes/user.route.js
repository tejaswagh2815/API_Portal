const express = require("express");
const {
  register,
  login,
  getUserData,
  deleteUser,
  getAll,
  GetUserByID,
  editUser,
} = require("../controllers/user.controller");
const verifyUser = require("../middleware/auth");

const route = express.Router();

route.post("/register", verifyUser, (req, res) => {
  register(req.body)
    .then((data) => res.status(data.status).json(data.data))
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.post("/login", (req, res) => {
  login(req.body)
    .then((data) => {
      if (data.status === 200) {
        res
          .cookie("token", data.data.data.token)
          .status(data.status)
          .json(data.data);
      } else {
        res.status(data.status).json(data.data);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.get("/verifyuser", verifyUser, (req, res) => {
  getUserData(req.body)
    .then((data) => res.status(data.status).json(data.data))
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.get("/logout", verifyUser, (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ result: true, reason: "Logout sccussefully" });
});

route.get("/userlist", verifyUser, (req, res) => {
  getAll()
    .then((data) => res.status(data.status).json(data.data))
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.get("/user/:id", verifyUser, (req, res) => {
  GetUserByID(req.params)
    .then((data) => res.status(data.status).json(data.data))
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.put("/edituser", verifyUser, (req, res) => {
  editUser(req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => res.status(400).json(err.errors));
});

route.delete("/user/:id", verifyUser, (req, res) => {
  deleteUser(req.params)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => res.status(404).json(err.errors));
});

module.exports = route;
