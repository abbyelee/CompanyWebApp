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
    return new Promise(function (resolve, reject) {
        if (employees.length == 0) {
            reject("No Results Returned");
        }
        else {
            var j = 0;
            var managers = [];
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].isManager == true) {
                    managers[j] = employees[i];
                    j++;
                }
            }            
            resolve(managers);
        }
    });


}
module.exports.getDepartments=function(){
    return departments;
}

