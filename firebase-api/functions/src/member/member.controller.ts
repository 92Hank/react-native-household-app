import {Request, Response} from "express";
import {fb} from "../fb";
// import Task from "../../../../Common/Entity/Task";

const db = fb.firestore();

const memberCollection = "member";
// const householdCollection = "household";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const postMember = async (req: Request, res: Response) => {
  try {
    const member: Member = {
      houseHoldId: req.body["houseHoldId"],
      userId: req.body["userId"],
      emoji: req.body["emoji"],
      isPaused: false,
      isOwner: req.body["isOwner"],
      value: 0,
    };

    console.log(member);

    const newDoc = await db.collection(memberCollection).add(member);
    res.status(201).send(`Created a new task: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(
        // eslint-disable-next-line max-len
        "member should cointain ...!!!"
    );
  }
};

// TODO UPDATE...

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const updateMember = async (req: Request, res: Response) => {
//   const isPaused = req.body["isPaused"];
//   const isOwner = req.body["isOwner"];
//   const value = req.body["value"];
//   const memberId = req.params.id;

//   const ref = db.collection(memberCollection);

//   let data: FirebaseFirestore.DocumentData;

//   ref
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((userDoc) => {
//           // userDoc contains all metadata of Firestore object
//           const prop = userDoc.data();
//           if (prop.memberId === memberId) {
//             data = prop;
//             data.id = userDoc.id;
//           }
//         });
//       })
//       .then(() => {

//       });

//   db.collection(memberCollection)
//       .doc(userId)
//       .get()
//       .then((user) => {
//         if (!user.exists) throw new Error("Task not found");
//         res.status(200).json({id: user.id, data: user.data()});
//       })
//       .catch((error) => res.status(500).send(error));
// };


