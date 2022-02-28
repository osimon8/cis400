var express = require("express");
var router = express.Router();
var geolib = require("geolib");
const { authenticate } = require("./utils");

const { database } = require("../database/db");

router.post("/set", authenticate, async function (req, res, next) {
  const { userId } = res.locals;
  const { latitude, longitude } = req.body;
  if (!userId || !latitude || !longitude) {
    res.statusCode = 400;
    res.send("Missing user ID or coordinates");
    return;
  }
  const coords = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
  const valid_coords = geolib.isValidCoordinate(coords);
  if (!valid_coords) {
    res.status(400).send("Invalid coordinate format");
    return;
  }
  database.query(
    "INSERT INTO LOCATION (user_id,latitude,longitude) VALUES (?,?,?) ON DUPLICATE KEY UPDATE latitude=?,longitude=?;",
    [
      userId,
      coords.latitude,
      coords.longitude,
      coords.latitude,
      coords.longitude,
    ],
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

router.get("/get", async function (req, res, next) {
  database.query("SELECT * FROM LOCATION", function (error, results) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

router.get("/distance", async function (req, res, next) {
  database.query("SELECT * FROM LOCATION", function (error, results) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
