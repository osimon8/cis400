const jwt = require("jsonwebtoken");
const secret = require("../../secrets/jwt");
// const { database } = require("../database/db");

const authenticate = (req, res, next) => {
  const token = req.get("authorization");
  if (!token) {
    res.sendStatus(401);
    return;
  }
  let userId;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(400);
      return;
    } else {
      res.locals.userId = decoded.userId;
    }
  });
  next();
};

module.exports = {
  authenticate,
};
