import { webUrl } from "../../Config";
import household from "../../entity/household";
import task from "../../entity/task";

export async function GetHouseholdById(
  id: string
): Promise<[household | undefined, number, string]> {
  const rawResponse = await fetch(webUrl + "users/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json,text/plain",
      "Content-Type": "application/json",
    },
  });
  if (rawResponse.status === 200) {
    const user: household = await rawResponse.json();
    return [user, rawResponse.status, "ok"];
  }
  return [undefined, rawResponse.status, await rawResponse.text()];
}


// export async function GetTById<T>(
//   id: string
// ): Promise<[T | undefined, number, string]> {
//   const rawResponse = await fetch(webUrl + "task/" + id, {
//     method: "GET",
//     headers: {
//       Accept: "application/json,text/plain",
//       "Content-Type": "application/json",
//     },
//   });
//   if (rawResponse.status === 200) {
//     const t: T = await rawResponse.json();
//     return [t, rawResponse.status, "ok"];
//   }
//   return [undefined, rawResponse.status, await rawResponse.text()];
// }