var express = require("express");

var app = express();
var fs = require("fs");
var bodyparser = require("body-parser");

app.use(express.urlencoded());
app.use(express.json());

// app.get("", function (req, res) {
//      fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//         console.log( data );
//   var data = "welcome";
//   res.end(data);
//   //    });
// });

app.post("/create_user", function (req, res) {
  console.log(req.body.lastName);

  const newUser = new User(req.body);

  newUser.save();

  res.end("success");
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgresql://postgres:Paramesh@1997@localhost:5433/postgres"
);

sequelize

  .authenticate()

  .then(() => {
    console.log("Connection has been established successfully.");
  })

  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("user", {
  // attributes

  firstName: {
    type: Sequelize.STRING,

    allowNull: false,
  },

  lastName: {
    type: Sequelize.STRING,

    // allowNull defaults to true
  },
});
