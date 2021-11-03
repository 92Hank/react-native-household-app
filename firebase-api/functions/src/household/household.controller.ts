/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Request, Response} from "express";
import {fb, FieldValue} from "../fb";

const db = fb.firestore();
db.settings({ignoreUndefinedProperties: true});
const householdCollection = "household";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const post = async (req: Request, res: Response) => {
  try {
    const min = Math.ceil(1000);
    const max = Math.floor(9999);
    const household: Household = {
      name: req.body["name"],
      ownerId: req.body["ownerId"],
      member: [
        {
          userId: req.body.member["userId"],
          name: req.body.member["name"],
          isOwner: true,
          emoji: req.body.member["emoji"],
          isPaused: false,
          AcceptedStatus: "accepted",
        },
      ],
      userIds: [req.body.member["userId"]],
      inviteCode: Math.floor(Math.random() * (max - min + 1) + min).toString(),
    };

    const newDoc = await db.collection(householdCollection).add(household);
    res.status(201).send(`Created a new household: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send("Bad request: " + error);
  }
};

export const getHousehold = (req: Request, res: Response): void => {
  const householdId = req.params.id;
  db.collection(householdCollection)
      .doc(householdId)
      .get()
      .then((household) => {
        if (!household.exists) res.status(404).send("Household not found");

        let data = household.data();
        data!.id = household.id;
        res.status(200).json(data);
      })
      .catch((error) => res.status(500).send(error));
};

export const getUsersHouseholdsOnUserId = async (
    req: Request,
    res: Response
): Promise<void> => {
  const userId = req.params.userId;
  const households: FirebaseFirestore.DocumentData = [];

  db.collection(householdCollection)
      .where("userIds", "array-contains-any", [userId])
      .get()
      .then((snapshot) => {
        const snapDoc = snapshot.docs;
        snapDoc.forEach((s) => {
          let data = s.data();
          data.id = s.id;
          households.push(data);
        });
      })
      .then(() => {
        if (!households) {
          res.status(400).json("no households for this user");
        } else {
          res.status(200).json(households);
        }
      })
      .catch((error) => res.status(500).send(error));
};

export const joinHousehold = (req: Request, res: Response): void => {
  const inviteCode = req.body["inviteCode"];
  const houseHoldId = req.body["houseHoldId"];

  const member: Member = {
    name: req.body.member["name"],
    userId: req.body.member["userId"],
    isOwner: false,
    emoji: req.body.member["emoji"],
    isPaused: false,
    AcceptedStatus: "pending",
  };

  const query = db.collection(householdCollection);
  const query2 = query.doc(houseHoldId);
  query2
      .get()
      .then((query) => {
        const data = query.data();
        if (data?.inviteCode == inviteCode) {
          query.ref.update({
            member: FieldValue.arrayUnion(member),
            userIds: FieldValue.arrayUnion(req.body.member["userId"]),
          });
          res.status(200).json("member added");
        } else {
          res.status(400).json("invite code dose not match");
        }
      })
      .catch((error) => res.status(500).send(error.message));
};

export const acceptMember = (req: Request, res: Response): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
        let found = false;
        data?.member.forEach((m: any) => {
          if (m.userId === userId) {
            found = true;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            query.ref
                .update({
                  member: FieldValue.arrayRemove(m),
                })
                .then(() => {
                  m.AcceptedStatus = "accepted";
                  query.ref
                      .update({
                        member: FieldValue.arrayUnion(m),
                      })
                      .then(() => {
                        res.status(200).json("member accepted");
                      })
                      .catch(() => {
                        res.status(400).json("could not update");
                      });
                });
          }
        });
        if (!found) {
          res.status(404).json("userId or householdId not found");
        }
      })
      .catch((error) => res.status(500).send(error.message));
};

export const makeMemberAdmin = (req: Request, res: Response): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
        let found = false;
        data?.member.forEach((m: any) => {
          if (m.userId === userId) {
            found = true;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            query.ref
                .update({
                  member: FieldValue.arrayRemove(m),
                })
                .then(() => {
                  m.isOwner = true;
                  query.ref
                      .update({
                        member: FieldValue.arrayUnion(m),
                      })
                      .then(() => {
                        res.status(200).json("member is owner now");
                      })
                      .catch(() => {
                        res.status(400).json("could not update");
                      });
                });
          }
        });
        if (!found) {
          res.status(404).json("userId or householdId not found");
        }
      })
      .catch((error) => res.status(500).send(error.message));
};

export const getHouseholdsOnInviteCode = async (
    req: Request,
    res: Response
): Promise<void> => {
  const inviteCode = req.params.inviteCode;

  db.collection(householdCollection)
      .where("inviteCode", "==", inviteCode)
      .get()
      .then((snapshot) => {
        const snapDoc = snapshot.docs;
        if (snapshot.empty) {
          res.status(400).json("no houseHold with this invite code");
        }
        snapDoc.forEach((s) => {
          const data = s.data();
          data.id = s.id;
          res.status(200).json(data);
        });
      })
      .catch((error) => res.status(500).send(error));
};

export const changeNameOnHouseHold = (req: Request, res: Response): void => {
  const houseHoldId = req.body["houseHoldId"];
  const newName = req.body["name"];
  db.collection(householdCollection)
      .doc(houseHoldId)
      .set(
          {
            name: newName,
          },
          {merge: true}
      )
      .then(() => {
        res.status(200).json("Updated name on houseHold");
      })
      .catch((error) => res.status(500).send(error));
};

export const setMemberOnPauseHouseHold = (
    req: Request,
    res: Response
): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];
  const isPaused = req.body["isPaused"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
        let found = false;
        data?.member.forEach((m: any) => {
          if (m.userId === userId) {
            found = true;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            query.ref
                .update({
                  member: FieldValue.arrayRemove(m),
                })
                .then(() => {
                  m.isPaused = isPaused;
                  query.ref
                      .update({
                        member: FieldValue.arrayUnion(m),
                      })
                      .then(() => {
                        res.status(200).json("member paused status changed");
                      })
                      .catch(() => {
                        res.status(400).json("could not update");
                      });
                });
          }
        });
        if (!found) {
          res.status(404).json("userId or householdId not found");
        }
      })
      .catch((error) => res.status(500).send(error.message));
};

export const memberLeaveHouseHold = (req: Request, res: Response): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
        let found = false;
        data?.member.forEach((m: any) => {
          if (m.userId === userId) {
            found = true;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            query.ref
                .update({
                  member: FieldValue.arrayRemove(m),
                })
                .then(() => {
                  query.ref
                      .update({
                        userIds: FieldValue.arrayRemove(userId),
                      })
                      .then(function() {
                        db.collection("doneTask")
                            .get()
                            .then((snap) => {
                              snap.forEach((s) => {
                                const doneTask = s.data();
                                if (doneTask.userId === userId) {
                                  s.ref.delete();
                                }
                              });
                            });
                      })
                      .then(() => {
                        res.status(200).json("member left houseHold");
                      });
                })
                .catch(() => {
                  res.status(400).json("could not remove");
                });
          }
        });
        if (!found) {
          res.status(404).json("userId or householdId not found");
        }
      })
      .catch((error) => res.status(500).send(error.message));
};

export const memberChangeName = (req: Request, res: Response): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];
  const newName = req.body["name"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
      data?.member.forEach((m: any) => {
        if (m.userId === userId) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          query.ref
              .update({
                member: FieldValue.arrayRemove(m),
              })
              .then(() => {
                m.name = newName;
                query.ref
                    .update({
                      member: FieldValue.arrayUnion(m),
                    })
                    .then(() => {
                      res.status(200).json("member name updated");
                    })
                    .catch(() => {
                      res.status(400).json("could not update");
                    });
              });
        }
      });
      })
      .catch((error) => res.status(500).send(error.message));
};

export const updateMember = (req: Request, res: Response): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];
  const newName = req.body["name"];
  const newEmoji = req.body["emoji"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
      data?.member.forEach((m: any) => {
        if (m.userId === userId) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          query.ref
              .update({
                member: FieldValue.arrayRemove(m),
              })
              .then(() => {
                if (newName) {
                  m.name = newName;
                }
                if (newEmoji) {
                  m.emoji = newEmoji;
                }
                query.ref
                    .update({
                      member: FieldValue.arrayUnion(m),
                    })
                    .then(() => {
                      res.status(200).json("member name updated");
                    })
                    .catch(() => {
                      res.status(400).json("could not update");
                    });
              });
        }
      });
      })
      .catch((error) => res.status(500).send(error.message));
};

export const memberChangeEmoji = (req: Request, res: Response): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];
  const newEmoji = req.body["emoji"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
      data?.member.forEach((m: any) => {
        if (m.userId === userId) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          query.ref
              .update({
                member: FieldValue.arrayRemove(m),
              })
              .then(() => {
                m.emoji = newEmoji;
                query.ref
                    .update({
                      member: FieldValue.arrayUnion(m),
                    })
                    .then(() => {
                      res.status(200).json("member emoji updated");
                    })
                    .catch(() => {
                      res.status(400).json("could not update");
                    });
              });
        }
      });
      })
      .catch((error) => res.status(500).send(error.message));
};


export const rejectMember = (
    req: Request,
    res: Response
): void => {
  const houseHoldId = req.body["houseHoldId"];
  const userId = req.body["userId"];

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref
      .get()
      .then((query) => {
        let data = query.data();
      data?.member.forEach((m: any) => {
        if (m.userId === userId) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          query.ref
              .update({
                member: FieldValue.arrayRemove(m),
              })
              .then(() => {
                m.AcceptedStatus = "rejected";
                m.emoji = undefined;
                query.ref
                    .update({
                      member: FieldValue.arrayUnion(m),
                    })
                    .then(() => {
                      res.status(200).json("member rejected");
                    })
                    .catch(() => {
                      res.status(400).json("could not update");
                    });
              });
        }
      });
      })
      .catch((error) => res.status(500).send(error.message));
};
