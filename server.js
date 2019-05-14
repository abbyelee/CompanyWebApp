var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var multer = require ('multer');
var bodyParser = require ('body-parser');
var hbs = require('express-hbs');
var path = require("path");
var app = express();
var dataService = require("./data-service.js");
const fs = require('fs');
const upload = multer({storage:storage});
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
// setup a 'route' to listen on the default url path

//handlebar
// app.use(function (req, res, next) {
//     var route = req.baseUrl + req.path;
//     app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
//     next();
// });
app.set('view engine', 'hbs');
app.set('views',__dirname +'/views');
app.engine('hbs', hbs.express4({
    extname: '.hbs',
    defaultLayout: 'views/layout/main.hbs',
    layoutsDir: 'views/layout/main.hbs'
})
);
hbs.registerHelper('navLink', function (text, options) {
    var attrs = [];
    for (var prop in options.hash) {
        attrs.push(prop + '="' + options.hash[prop] + '"');
    }
    return new hbs.SafeString(
        "<a " + attrs.join(" ") + ">" + text + "</a>"
    );
});
// app.engine('hbs', exphbs({
//     extname: '.hbs',
//     defaultLayout: 'main',
//     helpers: {
//         navLink: function (url, options) {
//             return '<li' +
//                 ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
//                 '><a href="' + url + '">' + options.fn(this) + '</a></li>';
//         },
//         equal: function (lvalue, rvalue, options) {
//             if (arguments.length < 3)
//                 throw new Error("Handlebars Helper equal needs 2 parameters");
//             if (lvalue != rvalue) {
//                 return options.inverse(this);
//             } else {
//                 return options.fn(this);
//             }
//         }

//     }
// })
// );

app.get("/", function(req, res){
    res.render('home');
});
app.get("/home", function (req, res) {
    res.render('home');
});
app.get("/about", function (req, res) {
    res.render('about');
});
app.get("/images/add", function (req, res) {
    res.render('addImage');
});
app.post("/images/add",upload.single("imageFile"),(req,res) =>{
    res.redirect("/images");
});
app.get("/images", (req, res) => {//we need to json file step3
    fs.readdir("./public/images/uploaded", function (err, items) {
        console.log(items);
        res.send (items);
    });
});
app.get("/employees/add", function (req, res) {
    res.render('addEmployee');
});
app.post("/employees/add",function(req,res){
    dataService.addEmployee(req.body); 
    res.redirect("/employees");
});
app.get("/employees", function (req, res) {
    var allEmpData = dataService.getAllEmployees();
    res.render('employees',{employees:allEmpData});
    //res.send(dataService.getAllEmployees())
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
    var departments = dataService.getDepartments();
    res.render('departments', { dpt: departments});
    // res.send(dataService.getDepartments())
});

app.get("/repository", function (req, res) {
    res.render('repository');
});
app.get("/git", function (req, res) {
    res.render('git');

});
app.get("/ir", function (req, res) {
    res.render('ir');
});
app.get("/contact", function (req, res) {
    res.render('contact');
});

app.use((req, res) => {
    res.status(404).send("Page not found!!!");
});

app.listen(HTTP_PORT, function () {
    console.log("Express http server listening on 8080");
    dataService.initialize();
});
