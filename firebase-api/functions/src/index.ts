
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import cors = require("cors");

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

// initialize express server

const app = express();
app.use(cors({origin: true}));
app.use(express.json());
// const main = express();

// initialize the database and the collection
const db = admin.firestore();
const userCollection = "users";

// define google cloud function name
export const webApi = functions.https.onRequest(app);

interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;

}

// Create new user
app.post("/users", async (req, res) => {
  try {
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      id: req.body["id"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res
        .status(400)
        .send(
            // eslint-disable-next-line max-len
            "User should cointain firstName, lastName, email, and id!!!"
        );
  }
});

// get a single contact
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection).doc(userId).get()
      .then((user) => {
        if (!user.exists) throw new Error("User not found");
        res.status(200).json({id: user.id, data: user.data()});
      })
      .catch((error) => res.status(500).send(error));
});


// Delete a user
app.delete("/users/:userId", (req, res) => {
  db.collection(userCollection).doc(req.params.userId).delete()
      .then(()=>res.status(204).send("Document successfully deleted!"))
      .catch(function(error) {
        res.status(500).send(error);
      });
});

// Update user
app.put("/users/:userId", async (req, res) => {
  await db.collection(userCollection)
      .doc(req.params.userId)
      .set(req.body, {merge: true})
      .then(()=> res.json({id: req.params.userId}))
      .catch((error)=> res.status(500).send(error));
});
