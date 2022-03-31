var express = require("express");
const { authenticate, sendNotification } = require("./utils");

var router = express.Router();

const { database } = require("../database/db");

// import { v4 as uuid } from "uuid";
const { v4: uuid } = require("uuid");

// router.post(
//   "/sendMsg",
//   authenticate,
//   async function (req, res, next) {
//     const { userId } = res.locals;
//     const { friendId, msg } = req.body;
//     if (!friendId || !msg) {
//       res.statusCode = 404;
//       res.send("Missing friendId or msg");
//       return;
//     }
//     database.query(
//       `SELECT firstName, lastName FROM USERS JOIN FRIENDS ON id=friendId WHERE userId=? AND friendId=?;`,
//       [userId, friendId],
//       function (error, results) {
//         if (error) {
//           console.log(error);
//           res.sendStatus(500);
//           return;
//         } else if (results.length == 0) {
//           res.statusCode = 403;
//           res.send("Users are not friends");
//           return;
//         } else {
//           database.query(
//             `INSERT INTO CHATS (userId,friendId,text) VALUES (?,?,?)`,
//             [userId, friendId, msg],
//             function (error1, results1) {
//               if (error1) {
//                 console.log(error1);
//                 res.sendStatus(500);
//                 return;
//               } else {
//                 console.log("chat sent");
//                 const friend = results[0];
//                 res.locals.targetId = friendId;
//                 res.locals.title = `Message from ${friend.firstName} ${friend.lastName}`;
//                 res.locals.msg = msg;
//                 next();
//               }
//             }
//           );
//         }
//       }
//     );
//   },
//   sendNotification
// );

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
      "SELECT firstName, lastName FROM USERS JOIN FRIENDS ON id=friendId WHERE userId=? AND friendId=?;INSERT INTO CHATS (userId,friendId,text) VALUES (?,?,?)",
      [userId, friendId, userId, friendId, msg],
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

router.get("/getChat", 
authenticate, 
function (req, res, next) {
  const {userId} = res.locals;
  const friendId = req.headers.friendid;
  //const {userId, friendId} = req.body
  //console.log(friendId);
  if (!userId || !friendId) {
    res.status(400);
    res.send("Invalid email");
    return;
  }

  database.query(
    "SELECT * from CHATS WHERE userId=? AND friendId=? OR userId=? AND friendId=? ORDER BY timestamp DESC",
    [userId, friendId, friendId, userId],
    function (error, results) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results[0].length == 0) {
          res.status(404);
          res.send("User not found");
        } else {
          res.send(results);
        }
      }
    }
  );
});

module.exports = router;
