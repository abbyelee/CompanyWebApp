var localFunction = function (){
}
var localData="";

const fileStream = require('fs');
var departments =[];
var employees =[];

module.exports.initialize = function () {
    fileStream.readFile('./data/employees.json', (err, data)=>{
        employees = JSON.parse(data);
        return employees;
    });
    fileStream.readFile('./data/departments.json', (err, data) => {
        departments = JSON.parse(data);
        return departments;
    });
    
}

module.exports.getAllEmployees=function(){
    return employees; //json convert to string
}
module.exports.getImages = function () {
    fileStream.readdir('.public/images/uploaded', (err, data) => {
        var obj =JSON.parse(data);
        return obj;
    });
}
module.exports.getEmployeeByNum = function(value){
    var employee;
    for(var i=0; i<employees.length; i++){
        if(employees[i].employeeNum == value){ 
            employee = employees[i];
        } 
    }
    return employee;
}
module.exports.getEmployeeByDepartment = function (value) {
    var employeeByDep=[];
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].department == value) {
            employeeByDep.push(employees[i]);
        }
    }
    return employeeByDep;
}
module.exports.getEmployeeByStatus = function (value) {
    var employeeByStatus = [];
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].status == value) {
            employeeByStatus.push(employees[i]);
        }
    }
    return employeeByStatus;
}
module.exports.getEmployeeByManager = function (value) {
    var employeeByManager = [];
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].employeeManagerNum == value) {
            employeeByManager.push(employees[i]);
        }
    }
    return employeeByManager;
}

module.exports.addEmployee=function(employeeData){
    var length = employees.length;
    console.log("length : "+ length);
    employees[length] = employeeData;
    employees[length].employeeNum = length+1;
    if(employeeData.isManager ==null){
        employees[length].isManager=false;
    }else{
        employees[length].isManager = true;
    }
    return employees; 
}

module.exports.getManagers= function(){
    var managers = [];
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].isManager == true) {
            managers.push(employees[i]);
        }
    }
    return managers;
}
module.exports.getDepartments=function(){
    return departments;
}

