var express = require("express");
var router = express.Router();
const { authenticate, sendNotification } = require("./utils");

const { database } = require("../database/db");

const { v4: uuid } = require("uuid");

router.get("/get", authenticate, async function (req, res, next) {
  const { userId } = res.locals;
  database.query(
    "SELECT * FROM NOTIFICATIONS WHERE userId=?;",
    [userId],
    function (error, results) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    }
  );
});

router.post("/send", authenticate, sendNotification);

module.exports = router;
