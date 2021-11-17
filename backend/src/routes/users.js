const { response } = require("express");
var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { database } = require("../database/db");

// import { v4 as uuid } from "uuid";
const { v4: uuid } = require("uuid");

/* GET users listing. */
router.get("/", function (req, res, next) {
  database.query("SELECT email from USERS;", function (error, results) {
    if (error) {
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

router.get("/get/:email", function (req, res, next) {
  const { email } = req.params;
  if (!email) {
    res.status(400);
    res.send("Invalid email");
    return;
  }

  database.query(
    "SELECT * from USERS WHERE email=?;",
    [email],
    function (error, results) {
      if (error) {
        res.sendStatus(500);
      } else {
        if (results.length == 0) {
          res.status(404);
          res.send("User not found");
        } else {
          res.send(results[0]);
        }
      }
    }
  );
});

router.post("/create", async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.statusCode = 400;
    res.send("Missing email or password");
    return;
  }
  const hashed = await bcrypt.hash(password, saltRounds);
  database.query(
    "INSERT INTO USERS (id, email,password) VALUES(?,?,?);",
    [uuid(), email, hashed],
    function (error, results) {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          res.status(400);
          res.send(`User with email '${email}' already exists.`);
        } else {
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(201);
      }
    }
  );
});

module.exports = router;
