const path = require('path');
const fs = require('fs');

var lPath = '/public/Users/Posts';
var lUser = 'user01';
fs.readdir(__dirname + `${lPath}/${lUser}`,{ withFileTypes: true }, function(err, files) {
    if (err) throw err;
    const directoriesInDIrectory = files
        .map((item) => item.name);

    console.log(directoriesInDIrectory);
});


