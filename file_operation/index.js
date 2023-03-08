var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register code start
app.get('/register', function (req, res) {
    res.sendFile(__dirname + "/register.html");
});

app.post('/form-submit', function (req, res) {
    let name = "Name: " + req.body.name + "\n";
    let email = "Email: " + req.body.email + "\n";
    let data = name + email;

    fs.appendFile("sample.txt", data, (err) => {
        if (err) throw err;
        console.log("Completed file write!");
    });

    res.send(req.body);
});

// Register code end
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post('/login-form-submit', function (req, res) {

    fs.readFile("loginCredential.txt", (err, data) => {
        if (err) throw err;

        let temp = data.toString();
        let fileName = temp.slice(6, 9).toString();
        let filePassword = temp.slice(20, 23).toString();
        let name1 = req.body.name;
        let password1 = req.body.password;

        if (name1 === fileName && password1 === filePassword) {
            res.send(req.body);
        }
        else {
            res.sendFile(__dirname + "/login.html");
                res.redirect('/login')
        }
    });
});

app.listen(7000);