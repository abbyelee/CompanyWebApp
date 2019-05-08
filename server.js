var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();
var handlebars = require ('handlebars');
var dataService = require("./data-service.js");
const fs = require('fs');
var multer = require ('multer');
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});
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

app.get("/image/add", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});
app.post("/images/add",upload.single("imageFile"),(req,res) =>{
    res.redirect("/images");
});
app.get("/images", (req, res) => {//we need to json file step3
    fs.readdir("./public/images/uploaded", function (err, items) {
        console.log(items);
        res.send (items);
        for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
        }
    });

});
app.get("/employee/add", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});
app.get("/employees", function (req, res) {
    fs.readFile('./data/employees.json', (err, data) => {
        var obj= dataService.getAllEmployees(data);
        res.send(obj);
    });
});
app.get("/managers", function (req, res) {
    dataService.getManagers()
        .then(function (manager) {
            res.json(manager)
        }).catch(function (errmsg) {
            console.log(errmsg);
        });
});
   
app.get("/departments", function (req, res) {
    res.send(dataService.getDepartments())
});

app.get("/repository", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/repository.html"));
});
app.get("/git", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/git.html"));
});
app.get("/ir", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/ir.html"));
});
app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/contact.html"));
});

app.use((req, res) => {
    res.status(404).send("Page not found!!!");
});

app.listen(HTTP_PORT, function () {
    console.log("Express http server listening on 8080");
    dataService.initialize();
});
