var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();

// set the view engine to ejs
app.set('view engine', 'ejs');

let db = new sqlite3.Database('mydata.db3');

// index page
app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.get('/contact', function(req, res) {
	var sql = 'SELECT * FROM CONTACTS;';
	db.all(sql, [], (err, rows) =>{
	res.render('pages/contacts', {contacts: rows });
	});
});

app.get('/build', function(req, res) {
	db.run('CREATE TABLE IF NOT EXISTS contacts (fname text, lname text, email text, phone text)');
	db.close();
	res.send('The database function has ended');
});

app.listen(8080);
console.log('Server is listening on port 8080');
