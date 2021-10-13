import {Request, Response} from "express";
import {fb} from "../fb";

const db = fb.firestore();

const taskCollection = "tasks";

interface Task {
  name: string;
  value: 1 | 2 | 4 | 6 | 8;
}

// interface DoneTask {
//   timeDone: Date;
//   TaskId: string;
//   userId: string;
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const postTask = async (req: Request, res: Response) => {
  console.log("foobar");
  try {
    const task: Task = {
      name: req.body["name"],
      value: req.body["value"],
    };

    const newDoc = await db.collection(taskCollection).add(task);
    res.status(201).send(`Created a new task: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(
        // eslint-disable-next-line max-len
        "Task should cointain ...!!!"
    );
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getTask = (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId);
  db.collection(taskCollection)
      .doc(userId)
      .get()
      .then((user) => {
        if (!user.exists) throw new Error("Task not found");
        res.status(200).json({id: user.id, data: user.data()});
      })
      .catch((error) => res.status(500).send(error));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllTask = (req: Request, res: Response) => {
  const ref = db.collection(taskCollection);

  const data: any = [];

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
