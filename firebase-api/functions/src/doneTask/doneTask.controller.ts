/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Request, Response} from "express";
import {fb} from "../fb";

const db = fb.firestore();

const taskCollection = "doneTask";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const postDoneTask = async (req: Request, res: Response) => {
  try {
    const dateDone = new Date();
    dateDone.setHours(0, 0, 0, 0);
    const doneTask: DoneTask = {
      taskId: req.body["taskId"],
      userId: req.body["userId"],
      value: req.body["value"],
      dateDone: dateDone,
      houseHoldId: req.body["houseHoldId"],
    };

    const newDoc = await db.collection(taskCollection).add(doneTask);
    res.status(201).send(`Created a new task: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(
        // eslint-disable-next-line max-len
        "DoneTask should contain taskId, memberId and dateDone!!!"
    );
  }
};

export const getAllDoneTaskOfHouseHold = (req: Request, res: Response) => {
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
