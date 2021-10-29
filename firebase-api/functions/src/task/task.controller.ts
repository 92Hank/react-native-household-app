/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
      archived: false,
      description: req.body["description"],
      value: req.body["value"],
      name: req.body["name"],
      createdAt: new Date(),
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
      })
      .catch((error) => res.status(500).send(error));
};

export const editTask = (req: Request, res: Response) => {
  const id = req.params.id;

  const task: Task = {
    houseHoldId: req.body["houseHoldId"],
    repeated: req.body["repeated"],
    archived: req.body["archived"],
    description: req.body["description"],
    value: req.body["value"],
    name: req.body["name"],
    // createdAt: new Date(req.body["createdAt"]),
  };

  db.collection(taskCollection)
      .doc(id)
      .set(task, {merge: true})
      .then(() => {
        res.status(200).json("Updated task item: " + id);
      })
      .catch((error) => res.status(500).send(error));
};

export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;

  const taskRef = db.collection(taskCollection).doc(id);
  // const doneTaskCol = db.collection("doneTask");
  // .delete();

  taskRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const TaskId = doc.id;
          doc.ref
              .delete()
              .then(function() {
                db.collection("doneTask")
                    .get()
                    .then((snap) => {
                      snap.forEach((s) => {
                        const doneTask = s.data();
                        if (doneTask.taskId === TaskId) {
                          s.ref.delete();
                        }
                      });
                    });
              })
              .then(function() {
                res
                    .status(200)
                    .json(
                        "deleted task item: " + id + ", and doneTask connected to it"
                    );
              });
        } else {
          res.status(400).json("No such document: " + id);
        }
      })
      .catch((error) => res.status(500).send(error));
};

export const archiveTask = (req: Request, res: Response) => {
  const id = req.params.id;

  const taskRef = db.collection(taskCollection).doc(id);

  taskRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          doc.ref.set(
              {
                archived: true,
              },
              {merge: true}
          );
          res.status(200).json("archive task item: " + id);
        } else {
          res.status(400).json("No such document: " + id);
        }
      })
      .catch((error) => res.status(500).send(error));
};

export const activateTask = (req: Request, res: Response) => {
  const id = req.params.id;

  const taskRef = db.collection(taskCollection).doc(id);

  taskRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          doc.ref.set(
              {
                archived: false,
              },
              {merge: true}
          );
          res.status(200).json("activate task item: " + id);
        } else {
          res.status(400).json("No such document: " + id);
        }
      })
      .catch((error) => res.status(500).send(error));
};
