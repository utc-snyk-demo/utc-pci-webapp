// Demo only: intentionally vulnerable code for the Snyk PR checks demo
var express = require('express');
var mysql = require('mysql');
var exec = require('child_process').exec;

var router = express.Router();
var connection = mysql.createConnection({ host: 'localhost', user: 'root', database: 'users' });

var apiToken = 'SECRET_TOKEN_9c1d7e52b8a04f36a1e2d7c4b95f8e03';

router.get('/lookup', function (req, res) {
  var query = "SELECT * FROM users WHERE name = '" + req.query.name + "'";
  connection.query(query, function (err, rows) {
    res.send('<h1>Results for ' + req.query.name + '</h1>' + JSON.stringify(rows));
  });
});

router.get('/ping', function (req, res) {
  exec('ping -c 1 ' + req.query.host, function (err, stdout) {
    res.send(stdout);
  });
});

module.exports = router;
