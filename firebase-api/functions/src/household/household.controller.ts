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
          isAccepted: true,
        },
      ],
      userIds: [req.body.member["userId"]],
      inviteCode: Math.floor(Math.random() * (max - min + 1) + min).toString(),
    };

    const newDoc = await db.collection(householdCollection).add(household);
    res.status(201).send(`Created a new household: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(
        "Bad request: " + error
    );
  }
};

export const getHousehold = (req: Request, res: Response): void => {
  const householdId = req.params.id;
  db.collection(householdCollection)
      .doc(householdId)
      .get()
      .then((household) => {
        if (!household.exists) throw new Error("Household not found");
        res.status(200).json({id: household.id, data: household.data()});
      })
      .catch((error) => res.status(500).send(error));
};

export const getUsersHouseholdsOnUserId = async (req: Request, res: Response): Promise<void> => {
  console.log("foo");
  const userId = req.params.userId;
  const households: FirebaseFirestore.DocumentData = [];
  console.log(userId);

  db.collection(householdCollection)
      .where("userIds", "array-contains-any", [userId])
      .get()
      .then((snapshot) => {
        const snapDoc = snapshot.docs;
        snapDoc.forEach((s) => {
          const data = s.data();
          households.push(data);
        });
      }).then(() => {
        if (!households) {
          res.status(400).json("no households for this user");
        } else {
          res.status(200).json(households);
        }
      }).catch((error) => res.status(500).send(error));
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
    isAccepted: false,
  };

  const query = db.collection(householdCollection);
  const query2 = query.doc(houseHoldId);
  query2
      .get()
      .then((query) => {
        const data = query.data();
        console.log(data?.inviteCode);
        if (data?.inviteCode === inviteCode) {
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
  const houseHoldId= req.body["houseHoldId"];
  const userId = req.body["userId"];
  console.log(houseHoldId);
  console.log(userId);

  const ref = db.collection(householdCollection).doc(houseHoldId);
  ref.get()
      .then((query) => {
        let data = query.data();
      data?.member.forEach((m: any) => {
        if (m.userId === userId) {
          console.log(m);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          query.ref
              .update({
                member: FieldValue.arrayRemove(m),
              })
              .then(() => {
                m.isAccepted = true;
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
      data?.member.forEach((m: any) => {
        if (m.userId === userId) {
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
      })
      .catch((error) => res.status(500).send(error.message));
};

export const getHouseholdsOnInviteCode = async (
    req: Request,
    res: Response
): Promise<void> => {
  console.log("foo");
  const inviteCode = req.params.inviteCode;
  console.log(inviteCode);

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
          res.status(200).json(data);
        });
      })
      .catch((error) => res.status(500).send(error));
};


