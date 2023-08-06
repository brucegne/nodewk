const path = require('path');
const fs = require('fs');

module.exports = function() { 
    this.sum = function(a,b) { return a+b };
    this.multiply = function(a,b) { return a*b };
    this.whereisit = function(nPath) {
        return ( path.join(__dirname, nPath));
    }
    this.getUsers = function(lPath) {
          fs.readdir(`${lPath}`,{ withFileTypes: true }, function(err, files) {
            if (err) throw err;
            let directoriesInDIrectory = files
               .filter((item) => item.isDirectory())
               .map((item) => item.name);
               console.log(directoriesInDIrectory);
            return (directoriesInDIrectory);            
          })
    }
}
