import {Request, Response} from "express";
import {fb} from "../fb";
// import Task from "../../../../Common/Entity/Task";

const db = fb.firestore();

const taskCollection = "tasks";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const postTask = async (req: Request, res: Response) => {
  try {
    const task: Task = {
      houseHoldId: req.body["houseHoldId"],
      repeated: req.body["repeated"],
      archived: req.body["archived"],
      description: req.body["description"],
      value: req.body["value"],
    };

    const newDoc = await db.collection(taskCollection).add(task);
    res.status(201).send(`Created a new task: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(
        // eslint-disable-next-line max-len
        "Task should contain houseHoldId, repeated, archived, description and value!!!"
    );
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const getTask = (req: Request, res: Response) => {
//   const userId = req.params.id;
//   console.log(userId);
//   db.collection(taskCollection)
//       .doc(userId)
//       .get()
//       .then((user) => {
//         if (!user.exists) throw new Error("Task not found");
//         res.status(200).json({id: user.id, data: user.data()});
//       })
//       .catch((error) => res.status(500).send(error));
// };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllTaskOfHouseHold = (req: Request, res: Response) => {
  const houseHoldId = req.params.houseHoldId;
  const ref = db.collection(taskCollection);

  const data: FirebaseFirestore.DocumentData = [];

  ref
      .where("houseHoldId", "==", houseHoldId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((userDoc) => {
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
