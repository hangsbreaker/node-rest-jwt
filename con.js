require("dotenv").config();
var mysql = require("mysql");

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// const sql = "SELECT * FROM user";
// db.query(sql, function (err, res) {
//   if (err) throw err;
//   res.forEach((data) => {
//     console.log(`${data.username} \t ${data.level}`);
//   });
// });

module.exports = db;
