import admin = require("firebase-admin");
import functions = require("firebase-functions");
export const FieldValue = admin.firestore.FieldValue;


export const fb = admin.initializeApp(functions.config().firebase);

