import {Request, Response} from "express";
import {fb, FieldValue} from "../fb";


const db = fb.firestore();
db.settings({ignoreUndefinedProperties: true});
const householdCollection = "household";

// interface Household {
//   name: string;
//   ownerId?: string;
//   members?: string[]; // FK
//   inviteCode: string;
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const post = async (req: Request, res: Response) => {
  try {
    // generera random nummer mellan 1000-9999
    // TODO: kontrollera att numret är unikt
    const min = Math.ceil(1000);
    const max = Math.floor(9999);
    const household: Household = {
      name: req.body["name"],
      ownerId: req.body["ownerId"],
      member: [
        {
          id: req.body.member["id"],
          userId: req.body.member["userId"],
          isOwner: true,
          emoji: req.body.member["emoji"],
          value: 0,
          isPaused: false,
          isAccepted: true,
        },
      ],
      // TODO: Generera en inviteCode på ett smartare sätt?
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

// Hämtar alla hushåll som en användare är med i
export const getUserHouseholds = (req: Request, res: Response): void => {
  // ta in den inloggade användaren och använd här istället:
  const user = "Pelle";
  const households: FirebaseFirestore.DocumentData = [];

  db.collection(householdCollection)
      .where("members", "==", user)
      .get()
      .then(function(querySnapshot) {
        if (!querySnapshot) throw new Error("Household not found");
        querySnapshot.forEach((householdDoc) => {
          const data = householdDoc.data();
          data.id = householdDoc.id;
          households.push(data);
        });
      })
      .then(() => {
        res.status(200).json(households);
      })
      .catch((error) => res.status(500).send(error));
};

export const joinHousehold = (req: Request, res: Response): void => {
  const inviteCode = req.body["inviteCode"];
  const houseHoldId = req.body["houseHoldId"];

  const member: Member = {
    id: req.body.member["id"],
    userId: req.body.member["userId"],
    isOwner: false,
    emoji: req.body.member["emoji"],
    value: 0,
    isPaused: false,
    isAccepted: false,
  };

  // const householdName = "Hemmet";
  // const user = req.params.userId;
  const query = db.collection(householdCollection);
  // const query3 = query.where("inviteCode", "==", inviteCode);
  const query2 = query.doc(houseHoldId);
  // const query3 = query2.where("inviteCode", "==", inviteCode);
  query2
      .get()
      .then((query) => {
        const data = query.data();
        console.log(data?.inviteCode);
        if (data?.inviteCode === inviteCode) {
          query.ref.update({
            member: FieldValue.arrayUnion(member),
          });
          res.status(200).json("member added");
        } else {
          res.status(400).json("invite code dose not match");
        }
      })
      .catch((error) => res.status(500).send(error.message));
};


