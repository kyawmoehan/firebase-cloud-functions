// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
exports.addTodo = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const todo = req.query.todo;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('todos').add({ name: todo });
    // Send back a message that we've succesfully written the message
    res.json({ result: `Todo with ID: ${writeResult.id} added.` });
});

exports.getTodos = functions.https.onRequest(async (req, res) => {
    let todos = [];
    const snapshot = await admin.firestore().collection('todos').get()
    snapshot.docs.map(doc => todos.push(doc.data()));
    res.json(todos);
});


