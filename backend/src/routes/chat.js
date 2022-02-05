var express = require("express");
const { authenticate, sendNotification } = require("./utils");

var router = express.Router();

const { database } = require("../database/db");

// import { v4 as uuid } from "uuid";
const { v4: uuid } = require("uuid");

router.post(
  "/sendMsg",
  authenticate,
  async function (req, res, next) {
    const { userId } = res.locals;
    const { friendId, msg } = req.body;
    if (!friendId || !msg) {
      res.statusCode = 404;
      res.send("Missing friendId or msg");
      return;
    }
    database.query(
      "SELECT firstName, lastName FROM USERS JOIN FRIENDS ON id=friendId WHERE userId=? AND friendId=?;",
      [userId, friendId],
      function (error, results) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        } else if (results.length == 0) {
          res.statusCode = 403;
          res.send("Users are not friends");
          return;
        } else {
          const friend = results[0];
          res.locals.targetId = friendId;
          res.locals.title = `Message from ${friend.firstName} ${friend.lastName}`;
          res.locals.msg = msg;
          next();
        }
      }
    );
  },
  sendNotification
);

module.exports = router;
