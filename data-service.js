var localFunction = function (){
    //a function local to this module
}
var localData="";
//module.exports.initialize()=function(data){

//}
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

module.exports.getAllEmployees=function(data){
    return JSON.parse(data); //json convert to string
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

