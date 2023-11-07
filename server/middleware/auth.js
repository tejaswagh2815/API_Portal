const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyUser(req, res, next) {
  try {
    const token = req.cookies.token;
    const jwtsec = process.env.JWT_SECRET;
    if (!token) {
      return res
        .status(403)
        .json({ result: false, reason: "No Token Provided" });
    } else {
      jwt.verify(token, jwtsec, async (err, decode) => {
        if (err) {
          return res.status(400).json({ result: false, reason: err.message });
        } else {
          req.body.id = decode.user_id;
          next();
        }
      });
    }
  } catch (error) {
    console.log("erro", error);
    return res.status(401).json({ message: "Session Timeout, Please Login" });
  }
}

module.exports = verifyUser;
