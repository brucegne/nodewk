const express = require('express');
const app = express();
const port = 3003;
var fs = require('fs');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./mygazette.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
db = admin.firestore();

async function addRec() {
	await db.collection('ItsMe').doc().set({
		"first": "Bruce Edwin",
		"Last": "Gordon",
		"Age": "68"
	})
}

async function getRec() {
	const user = await db.collection('ItsMe').doc('SecondOne').get();
//	const data = await db.collection('ItsMe').where('first', '==', 'Danial David').orderBy("first").get();
	const data = await db.collection('ItsMe').orderBy("first").get();
	var resArr = [];
	data.forEach((doc) => {
		resArr.push(doc.data());
//		console.log(doc.id,'\t', doc.data()['first'],'\t', doc.data()['Last'])
//		db.collection('ItsMe').doc(doc.id).delete();
	});
	return resArr;
}


app.get('/', function(req,res) {
	res.send("<h1>Hello World</h1>")
    });    

app.listen(8000);
    console.log('Server is listening on port 8000');
