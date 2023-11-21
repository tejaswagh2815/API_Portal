const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const ck = require("cookie-parser");

const app = express();
const authApi = require("./routes/user.route");
const projectApi = require("./routes/project.route");
const teamApi = require("./routes/team.route");
const port = process.env.PORT;

//middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(ck());

app.use("/auth", authApi);
app.use("/api", projectApi);
app.use("/api", teamApi);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is runnig on http://localhost:${port}`);
});
