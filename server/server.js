const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const ck = require("cookie-parser");

const app = express();
const authApi = require("./routes/user.route");

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(ck());
app.use(cors());

app.use("/auth", authApi);

app.get("/", (req, res) => {
  res.send("server is running");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is runnig on http://localhost:${port}`);
});
