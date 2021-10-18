/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Request, Response} from "express";
import {fb} from "../fb";
const db = fb.firestore();

const userCollection = "users";

export const createUser = async (req: Request, res: Response) => {
  const createU: CreateUser = {
    userName: req.body["userName"],
    password: req.body["password"],
    email: req.body["email"],
  };

   let create = true;
   const ref = db.collection(userCollection);

   const data: FirebaseFirestore.DocumentData = [];

   await ref
     .get()
     .then((querySnapshot) => {
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
       data.forEach((doc: FirebaseFirestore.DocumentData) => {
         console.log(doc.email);
         if (doc.email === createU.email) {
           res
             .status(400)
             .send("this email already exists");
             create = false;
         }
       });
     }).then(async () => {
       if (create) {
             const newDoc = await db.collection(userCollection).add(createU);
             res.status(201).send(`Created a new user: ${newDoc.id}`);
       }
     }).catch((err) => {
       console.log(err);
          res.status(400).send("user should have userName, password and email");
     });

    //  if (create) {
    //     try {
    //       const newDoc = await db.collection(userCollection).add(createU);
    //       res.status(201).send(`Created a new user: ${newDoc.id}`);
    //     } catch (err) {
    //       console.log(err);
    //       res.status(400).send("user should have userName, password and email");
    //     }
    //  }
};

// get a single contact
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUser = (req: Request, res: Response) => {
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
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllUsers = (req: Request, res: Response) => {
  const ref = db.collection(userCollection);

  const data: FirebaseFirestore.DocumentData = [];

  ref
    .get()
    .then((querySnapshot) => {
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

export const signInUser = (req: Request, res: Response) => {
  const password = req.body["password"];
  const email = req.body["email"];

  const query = db.collection(userCollection);
  const query2 = query.where("email", "==", email);
  const query3 = query2.where("password", "==", password);
  query3
    .get()
    .then((docs) => {
      console.log(docs.empty);
      if (docs.empty) {
        res.status(404).send("no user with this email or password");
      }
      docs.forEach((doc) => {
        const data = doc.data();
        // const user = {email: data.email, userName: data.userName, id: doc.id};
        // data.id = doc.id;
        res
          .status(200)
          .json({email: data.email, userName: data.userName, id: doc.id});
      });
    })
    .catch((error) => res.status(500).send(error));
};

// // Update user
// app.put("/users/:userId", async (req, res) => {
//   await db
//       .collection(userCollection)
//       .doc(req.params.userId)
//       .set(req.body, {merge: true})
//       .then(() => res.json({id: req.params.userId}))
//       .catch((error) => res.status(500).send(error));
// })
