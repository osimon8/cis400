var express = require("express");
const secret = require("../../secrets/rds");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { authenticate } = require("./utils");

const { database } = require("../database/db");

// import { v4 as uuid } from "uuid";
const { v4: uuid, validate } = require("uuid");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("testing", req.get("authorization"));
  database.query(
    "SELECT id, email, firstName, lastName from USERS;",
    function (error, results) {
      if (error) {
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    }
  );
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
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password) {
    res.statusCode = 400;
    res.send("Missing email or password");
    return;
  }
  const hashed = await bcrypt.hash(password, saltRounds);
  database.query(
    "INSERT INTO USERS (id, email, password, firstName, lastName) VALUES(?,?,?,?,?);",
    [uuid(), email, hashed, firstName, lastName],
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

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.statusCode = 400;
    res.send("Missing email or password");
    return;
  }
  database.query(
    "SELECT id,password FROM USERS WHERE email=?;",
    [email],
    async function (error, results) {
      if (error) {
        res.sendStatus(500);
      } else {
        if (results.length == 0) {
          res.status(404);
          res.send("User not found");
        } else {
          const user = results[0];
          const valid = await bcrypt.compare(password, user.password);
          console.log("valid", valid);
          if (valid) {
            /*
             * replaced secret with '12345'
             */
            const token = jwt.sign({ userId: user.id }, "12345", {
              expiresIn: "365d",
            });
            res.send(token);
          } else {
            res.status(401).send("Invalid password");
          }
        }
      }
    }
  );
});

router.post("/addFriend", authenticate, async function (req, res, next) {
  const { userId } = res.locals;
  console.log("userId", userId);
  const { friendId } = req.body;
  if (!friendId) {
    res.statusCode = 400;
    res.send("Missing friendId");
    return;
  }
  database.query(
    "INSERT INTO FRIENDS (userId, friendId) VALUES(?,?), (?,?);",
    [userId, friendId, friendId, userId],
    function (error, results) {
      if (error) {
        console.log(error);
        if (error.code === "ER_NO_REFERENCED_ROW") {
          res.status(404);
          res.send("User with provided ID not found");
        } else if (error.code === "ER_DUP_ENTRY") {
          res.status(400);
          res.send("Users are already friends");
        } else {
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(201);
      }
    }
  );
});

router.get("/getFriends", authenticate, async function (req, res, next) {
  const { userId } = res.locals;
  //changed the querry to retrieve the firstname, lastname, and email
  database.query(
    "SELECT * from (SELECT friendId FROM FRIENDS WHERE userId=?) a Join USERS ON a.friendId = USERS.id;",
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

router.get("/search", async function (req, res, next) {
  const { input } = req.query;
  console.log("input", input);
  database.query(
    `SELECT id, firstName, lastName, email FROM USERS WHERE email LIKE '%${input}%';`,
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

module.exports = router;
