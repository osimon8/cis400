var mysql = require("mysql");

const creds = require("../../secrets/rds");
var database = mysql.createConnection(creds);

database.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

export { database };
