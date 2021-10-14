// import * as admin from "firebase-admin";
import {Request, Response} from "express";
// import {db} from "../index";
import {fb} from "../fb";
// admin.initializeApp();
const db = fb.firestore();

const householdCollection = "household";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const post = async (req: Request, res: Response) => {
  console.log("foo");
  try {
    const min = Math.ceil(1);
    const max = Math.floor(9999);
    const household: Household = {
      name: req.body["name"],

      // TODO: Fixa ownerId från usern som skapar hushållet
      //   ownerId: req.body["ownerId"],
      //   users: req.body["users"],
      // TODO: Generera en inviteCode på ett smartare sätt?
      inviteCode: Math.floor(Math.random() * (max - min + 1) + min).toString(),
    };

    const newDoc = await db.collection(householdCollection).add(household);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(
        // eslint-disable-next-line max-len
        "User should cointain firstName, lastName, email, and id!!!"
    );
  }
};

// get a single contact
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getHousehold = (req: Request, res: Response) => {
  const householdId = req.params.id;
  db.collection(householdCollection)
      .doc(householdId)
      .get()
      .then((household) => {
        if (!household.exists) throw new Error("User not found");
        res.status(200).json({id: household.id, data: household.data()});
      })
      .catch((error) => res.status(500).send(error));
};

// Delete a user
// app.delete("/users/:userId", (req, res) => {
//   db.collection(userCollection)
//       .doc(req.params.userId)
//       .delete()
//       .then(() => res.status(204).send("Document successfully deleted!"))
//       .catch(function(error) {
//         res.status(500).send(error);
//       });
// });

// // Update user
// app.put("/users/:userId", async (req, res) => {
//   await db
//       .collection(userCollection)
//       .doc(req.params.userId)
//       .set(req.body, {merge: true})
//       .then(() => res.json({id: req.params.userId}))
//       .catch((error) => res.status(500).send(error));
// });
