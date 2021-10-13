import {Request, Response} from "express";
import {fb} from "../fb";
const db = fb.firestore();

const userCollection = "users";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isOwner: boolean;
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const post = ( async (req: Request, res: Response) => {
  console.log("foo");
  try {
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      isOwner: req.body["isOwner"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(
        // eslint-disable-next-line max-len
        "User should cointain firstName, lastName, email, and id!!!"
    );
  }
});


// get a single contact
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUser = ((req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId);
  db.collection(userCollection)
      .doc(userId)
      .get()
      .then((user) => {
        if (!user.exists) throw new Error("User not found");
        res.status(200).json({id: user.id, data: user.data()});
      })
      .catch((error) => res.status(500).send(error));
});

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

