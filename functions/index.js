//const firebase = require('firebase/auth');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
var createError = require('http-errors');
var express = require('express');
var cors = require('cors')({ origin: true });;
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

var app = express();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors());

// app.use(function (req, res, next) {
//     console.log('Index hit');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

admin.initializeApp();
var db = admin.firestore();



let talks = [];
let sessions = [];

exports.talks = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        talks = [];
        db.collection("talks").get().then(snapshot => {
            snapshot.forEach(doc => {
                talks.push(doc.data());
            });
            talks.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : -1);
            response.status(200);
            response.send(talks);
        });
    });
});

exports.sessions = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        sessions = [];
        db.collection("sessions").get().then(snapshot => {
            snapshot.forEach(doc => {
                sessions.push(doc.data());
            });
            console.log(sessions);
            response.status(200);
            response.send(sessions);
        });
    });
});

exports.talkRatings = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        //name = request.get_json().get('name');
        console.log("Query - ", request.query);
        var id = request.query.eventId;
        console.log("id - ", id)
        var rating = request.query.rating;
        if (typeof id !== 'undefined' && typeof rating !== 'undefined') {
            db.collection("talks").where("id", "==", id).get().then(snapshot => {
                var document;
                var data;
                snapshot.forEach(doc => {
                    console.log("Document Data - ", doc.data());
                    document = doc;
                    data = document.data();
                });

                console.log("Ratings before push - ", data.ratings);
                data.ratings.push(rating);
                console.log("Ratings after push - ", data.ratings);
                console.log(document.id);
                db.collection("talks").doc(document.id).update({ ratings: data.ratings });
                response.status(202);
                response.send(data);
            });
        } else {
            response.status(400);
        }
    });
});


