const jwt = require("jsonwebtoken");
const secret = require("../../secrets/rds");
const { database } = require("../database/db");
const { v4: uuid } = require("uuid");

const authenticate = (req, res, next) => {
  const token = req.get("authorization");
  // console.log("Authorization", req.get("Auth"));
  if (!token) {
    res.sendStatus(401);
    return;
  }
  /*
   * replaced secret with '12345'
   */
  jwt.verify(token, "12345", (err, decoded) => {
    if (err) {
      console.log(err);
      res.status("Couldn't validate authentication token");
      res.send(401);
      return;
    } else {
      res.locals.userId = decoded.userId;
      next();
    }
  });
};

const sendNotification = (req, res, next) => {
  const targetId = res.locals.targetId || req.body.targetId;
  const msg = res.locals.msg || req.body.msg;
  const title = res.locals.title || req.body.title;

  console.log(targetId, msg, title);

  if (!targetId || !title) {
    res.statusCode = 400;
    res.send("Missing targetId or title");
    return;
  }
  const id = uuid();
  database.query(
    "INSERT INTO NOTIFICATIONS (id, userId, msg, title) VALUES(?,?,?,?);",
    [id, targetId, msg, title],
    function (error, results) {
      if (error) {
        console.log(error);
        if (error.code === "ER_NO_REFERENCED_ROW") {
          res.status(404);
          res.send("User with provided ID not found");
        } else {
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(201);
      }
    }
  );
};

module.exports = {
  authenticate,
  sendNotification,
};
