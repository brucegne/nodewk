// var http = require('http');
const path = require('path');
const fs = require('fs');
require('./tools')();

const contentPath = path.join(__dirname, '/public/Users/Posts/user01/post1012');

var content = 'Bruce|Gordon\r';
var cMain = [];
var i = 0;
for(i == 0; i < 100; i++){
	cMain.push(content);
	fs.writeFile(contentPath, cMain, { flag: 'a+' }, err => {});
}
var cIn = (cMain);

for(i==0;i < 100; i++) {
	console.log(i);
	console.log(cMain[i]);
	
}

console.log("done");

