var express = require('express');
var app = express();
var request = require('request');
const fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
var sqlite3 = require('sqlite3').verbose();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static('public'))


let db = new sqlite3.Database('mydata.db3');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: 'brucegne@gmail.com',
        pass: 'scfymqarxgsnrodj'
    }
});

function mailIt(){
    var mailOptions = {
        from: 'brucegne@gmail.com',
        to: 'brucegne@gmail.com',
        submect: 'Sending a test email from node js',
        text: 'That was way easier than I thought it would be.'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
        }else{
            console.log(info);
        }
    });
};

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

app.get('/paper', function(req, res) {
    res.render('pages/mypaper');
});

// about page
app.get('/about', function(req, res) {
   mailIt();
  res.render('pages/about');
});

app.get('/contact', function(req, res) {
	var sql = 'SELECT rowid,* FROM CONTACTS;';
	db.all(sql, [], (err, rows) =>{
	res.render('pages/contacts', {contacts: rows, uname: 'Bruce E. Gordon', mesg: "Isn't this neet?" });
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

app.get('/upload', (req, res) => {
    res.render('pages/upload')
});


app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.image;
  uploadPath = __dirname + '/public/image/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.redirect('/');;
  });
});

/*
app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    console.log(image.name);
    console.log(image.mimetype);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);
    res.redirect('/');
});
*/
app.listen(5000);
    console.log('Server is listening on port 5000');
