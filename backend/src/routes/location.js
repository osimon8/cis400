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

router.get("/getFriendsNearby", authenticate, async function (req, res, next) {
  const { userId } = res.locals;
  const radii = [1, 2, 3]; // miles
  database.query(
    `SELECT friendId as id, f.email, f.firstName, f.lastName, 
		l1.latitude as lat1, l1.longitude as long1, l2.latitude as lat2, l2.longitude as long2
    FROM FRIENDS 
    JOIN ONLINE on friendId = id 
  	JOIN USERS as u	on userId=u.id 
  	JOIN USERS as f ON friendId = f.id
    JOIN LOCATION as l1 ON f.id = l1.user_id  
    JOIN LOCATION as l2 ON u.id = l2.user_id
    WHERE userId = ? AND status=true`,
    [userId],
    function (error, results) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      const f = (v) => {
        const { id, email, firstName, lastName, lat1, long1, lat2, long2 } = v;
        const d =
          geolib.getDistance(
            { latitude: lat1, longitude: long1 },
            { latitude: lat2, longitude: long2 }
          ) * 0.000621371; // meters to miles
        return { id, email, firstName, lastName, distance: d };
      };

      const mapped = results.map(f);
      let entries = radii.map((rad, i) => {
        const in_range = mapped.filter((v) => {
          const { distance } = v;
          return (i == 0 || distance > radii[i - 1]) && distance < rad;
        });
        const ls = in_range.map((v) => {
          const { id, email, firstName, lastName } = v;
          return { id, email, firstName, lastName };
        });
        return [rad, ls];
      });
      res.send(Object.fromEntries(entries));
    }
  );
});
module.exports = router;
