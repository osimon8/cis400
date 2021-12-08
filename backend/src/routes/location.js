var express = require("express");
var router = express.Router();
var geolib = require("geolib");

const { database } = require("../database/db");

router.post("/set", async function (req, res, next) {
  const { userId, coordinates } = req.body;
  if (!userId || !coordinates) {
    res.statusCode = 400;
    res.send("Missing user ID or coordinates");
    return;
  }
  const valid_coords = geolib.isSexagesimal(coordinates);
  if (!valid_coords) {
    res.status(400).send("Invalid coordinate format");
    return;
  }
  database.query(
    "INSERT INTO LOCATION (user_id,coordinates) VALUES (?,?) ON DUPLICATE KEY UPDATE coordinates=?;",
    [userId, coordinates, coordinates],
    function (error) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
