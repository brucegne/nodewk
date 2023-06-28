var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
	var sql = 'SELECT rowid,* FROM CONTACTS;';
	db.all(sql, [], (err, rows) =>{
	res.render('pages/contacts', {contacts: rows });
	});
});

app.get('/edit/:recID', (req, res) => {
    const recID = req.params.recID;
    const sql = `select rowid, *  from contacts where rowid = '${recID}';` 
    db.all(sql, [], (err, row) => {
        console.log(row[0]);
        res.render('pages/edit', {contact: row[0]});
    });
});

app.delete('/delete/:recID', (req, res) => {
    const recID = req.params.recID;
    const sql = `delete from contacts where rowid = '${recID}';` 
    db.all(sql, [], (err, row) => {
        console.log(row[0]);
        res.render('pages/edit', {contact: row[0]});
    });
});

app.post('/editrec', (req, res) => {
    var rowid = req.body.rowid;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var phone = req.body.phone;
    var delCont = req.body.delCont;
    if(delCont) {
        var sql = `delete from contacts where rowid = '${rowid}';`;
    } else {
        var sql = `update contacts set fname='${fname}', lname='${lname}', email='${email}', phone='${phone}'  where rowid = ${rowid}`;
    }
    db.run(sql, [], function(err,row) {
        console.log(err);
        console.log(delCont);
        res.redirect('/contact');
    });
});

app.post('/contact_post', function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const sql=`insert into contacts values ('${fname}', '${lname}', '${email}','${phone}')`;
    console.log(sql);
    db.run(sql, [], function(err) {
        console.log(err);

    });
    res.redirect("/contact");
});

app.listen(8080);
    console.log('Server is listening on port 8080');
