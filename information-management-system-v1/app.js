var express = require('express');
var ejs = require("ejs");
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');

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
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database:'student',
        port: 3306
    });

    conn.connect();
    conn.query('select * from student_name', function(err, rows, fields) {
        res.send({
            status : 1,
            data : rows,
            message : ""
        });
        conn.end();
    });
});

app.delete("/student_name", function(req, res) {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database:'student',
        port: 3306
    });

    conn.connect();
    conn.query("delete from student_name where id="+ req.body.id, function(err, rows, fields) {
        if(err === null) {
            res.send({
                status : 200,
                data : "",
                message : ""
            });
        }else {
            res.send({
                status : 500,
                data : "",
                message : err
            });
        }
        conn.end();
    });
});

app.post("/student_name", function(req, res) {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database:'student',
        port: 3306
    });

    conn.connect();
    conn.query("insert into student_name values ('', '" + req.body.id + "')", function(err, rows, fields) {
        res.send({
            status : 1,
            data : "ok",
            message : ""
        });
        conn.end();
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
