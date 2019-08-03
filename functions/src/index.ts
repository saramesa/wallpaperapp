const firebaseHelper = require('firebase-functions-helper');
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const pictures = 'pictures';

export const webApi = functions.https.onRequest(main);

// View a picture
app.get('/pictures/:id', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, pictures, req.params.team)
        .then((doc: any) => res.status(200).send(doc));
})

// View all pictures
app.get('/pictures', (req, res) => {
    firebaseHelper.firestore
        .backup(db, pictures)
        .then((data: any) => res.status(200).send(data))
})