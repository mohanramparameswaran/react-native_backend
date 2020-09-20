var express = require("express");

var app = express();

const pg = require("pg");
const R = require("ramda");

const cs = "postgresql://postgres:Paramesh@1997@localhost:5433/postgres";
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
  let result;
  console.log(req.body.lastName);

  const newUser = new User(req.body);

  newUser.save();
  result = "success";
  res.end(result);
});

app.post("/fetch_data", function (req, res1) {
  let result;
  console.log("------------req.body-------------");
  console.log(req.body);
  const client = new pg.Client(cs);
  client.connect();

  client
    .query("SELECT * FROM  users")
    .then((res) => {
      const data = res.rows;

      data.forEach((row) => {
        console.log(
          `Id: ${row.id} Name: ${row.firstName} Lname: ${row.lastName}`
        );
        console.log("---------------Names---------------");
        console.log(row.firstName);
        console.log("---------------Req Names---------------");
        console.log(req.body.firstName);

        if (row.firstName == req.body.firstName) {
          console.log("inside if");
          result = "successful";
          res1.send(result);
        }
      });
      console.log("------------result--------------");
      console.log(result);
      if (result == "successful") {
        console.log("Data in DB");
      } else {
        console.log("Not in DB");
      }
    })
    .finally(() => {
      client.end();
    });
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
