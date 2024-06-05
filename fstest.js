const admin = require('firebase-admin');
const serviceAccount = require('./mygazette.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore();
async function addRec() {
	await db.collection('ItsMe').add({
		"first": "Merele David",
		"Last": "Myers",
		"Age": "94",
		"NickName": "Moldy"
	})
}

async function getRecs() {
//	const user = await db.collection('ItsMe').doc('SecondOne').get();
//	const data = await db.collection('ItsMe').where('first', '==', 'Merle David').orderBy("first").get();
	const data = await db.collection('ItsMe').orderBy("Age").get();
	var resArr = [];
	data.forEach((doc) => {
		resArr.push(doc.data());
		console.log(doc.id,'\t', doc.data()['first'],'\t', doc.data()['Last'], doc.data()['NickName'])
//		db.collection('ItsMe').doc(doc.id).delete().then(() => {
//    console.log("Document successfully deleted!");
//	}).catch((error) => {
//	    console.error("Error removing document: ", error);
//	});
	console.log(resArr);

})
}
addRec();
getRecs();

