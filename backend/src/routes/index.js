var express = require('express');
// const { database } = require('../database/db');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(database);
  res.send("HELLO");
});

module.exports = router;
