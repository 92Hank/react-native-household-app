import {Request, Response} from "express";
import {fb} from "../fb";

const db = fb.firestore();

const taskCollection = "doneTask";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const postDoneTask = async (req: Request, res: Response) => {
  try {
    const doneTask: DoneTask = {
      taskId: req.body["taskId"],
      memberId: req.body["memberId"],
      dateDone: req.body["dateDone"],
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
