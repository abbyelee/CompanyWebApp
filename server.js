var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();
var dataService = require("./data-service.js");
const fs = require('fs');

app.use(express.static('public'));
// setup a 'route' to listen on the default url path
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
});
app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});
app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname,"/views/about.html"));
});
app.get("/employees", function (req, res) {
   // res.sendFile(path.join(__dirname, "/data/employees.json"));
    
    fs.readFile('./data/employees.json', (err, data) => {
       // if (err) throw err;
        var obj= dataService.getAllEmployees(data);
        //var obj=JSON.parse(data);//json convert to string
        console.log(obj);
      // res.json(null);
    });
   
   // res.json(data/employees.json);
});
app.get("/managers", function (req, res) {
    res.send("managers");
    fs.readFile('./data/employees.json', (err, data) => {
        // if (err) throw err;
        if (data.isManager==true){
        var obj = JSON.parse(data);//json convert to string
        console.log(obj);
        }
        // res.json(null);
    });
});
app.get("/departments", function (req, res) {
    res.send("departments");
    fs.readFile('./data/employees.json', (err, data) => {
        // if (err) throw err;

        var obj = JSON.parse(data);//json convert to string
        console.log(obj);
        // res.json(null);
    });
});

app.use((req, res) => {
    res.status(404).send("not found!!!");
});


//dataService.initialize().then(function(){
 //   app.listen(HTTP_PORT);
//});
//dataService.initialize().catch(function () {
//    app.listen(HTTP_PORT);
//});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, function(){
    console.log("Express http server listening on 8080");
});