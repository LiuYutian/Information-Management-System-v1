var express = require('express');
var ejs = require("ejs");
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var Sequelize = require('sequelize'),
    sequelize = new Sequelize('student', 'root', 'root', {
        dialect: "mysql",
        port: 3306,
    })

var User = sequelize.define('student_name', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING
}, {
    freezeTableName : true,
    timestamps: false
});

app.engine(".html", ejs.__express);
app.set("view engine", "html");

app.use(bodyParser.urlencoded(
    {extended : true}
));

app.use(express.static("public"));
app.use("/static", express.static("public"));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/student_names", function(req, res) {
    var row = [];
    User.findAll().then(function(data) {
        data.forEach(function(n, i) {
            row.push(n.dataValues);
        });
    }).done(function() {
        res.send({
            status : 1,
            data : row,
            message : ""
        });
    });
});

app.delete("/student_name", function(req, res) {
    User.destroy({where : {id : req.body.id}}).done(function() {
        res.send({
            status : 200,
            data : "",
            message : ""
        });
    });
});

app.post("/student_name", function(req, res) {
    User.create({
        name: req.body.id
    }).done(function() {
        res.send({
            status : 1,
            data : "ok",
            message : ""
        });
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
