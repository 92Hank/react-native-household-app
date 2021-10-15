/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Request, Response} from "express";
import {fb} from "../fb";
const db = fb.firestore();

const userCollection = "users";

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   isOwner: boolean;
// }


export const createUser = ( async (req: Request, res: Response) => {
  console.log("foo");

  const createU: CreateUser = {
    userName: req.body["userName"],
    password: req.body["password"],
    email: req.body["email"],
  };
  try {
    const newDoc = await db.collection(userCollection).add(createU);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (err) {
    console.log(err);
    res.status(400).send("user should have userName, password and email");
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


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllUsers = (req: Request, res: Response) => {
  const ref = db.collection(userCollection);

  const data: FirebaseFirestore.DocumentData = [];

  ref.get().then((querySnapshot) => {
    querySnapshot.forEach((userDoc) => {
      // userDoc contains all metadata of Firestore object
      console.log(userDoc.id);
      // eslint-disable-next-line prefer-const
      let taskDocData = userDoc.data();
      taskDocData.id = userDoc.id;
      data.push(taskDocData);
    });
  })
      .then(() => {
        res.status(200).json(data);
      });
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
// })
