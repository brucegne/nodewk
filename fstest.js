const admin = require('firebase-admin');
const serviceAccount = require('./mygazette.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore();

async function addRec() {
	await db.collection('ItsMe').doc().set({
		"first": "Merele David",
		"Last": "Myers",
		"Age": "94"
	})
}

async function getRec() {
//	const user = await db.collection('ItsMe').doc('SecondOne').get();
//	const data = await db.collection('ItsMe').where('first', '==', 'Danial David').orderBy("first").get();
	const data = await db.collection('ItsMe').orderBy("Age").get();
	var resArr = [];
	data.forEach((doc) => {
		resArr.push(doc.data());
		console.log(doc.id,'\t', doc.data()['first'],'\t', doc.data()['Last'])
//		db.collection('ItsMe').doc(doc.id).delete();
	});
	console.log(resArr);
}

// addRec();
getRec();
