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
//	const user = await db.collection('ItsMe').doc('SecondOne').get();
//	const data = await db.collection('ItsMe').where('first', '==', 'Danial David').orderBy("first").get();
	const data = await db.collection('ItsMe').orderBy("first").get();
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
