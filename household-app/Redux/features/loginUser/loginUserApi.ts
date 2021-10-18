import { LocalIp } from "../../Config";
import user from "../../Service/user/User";

// A mock function to mimic making an async request for data
export async function LogIn(
  email: string,
  password: string
): Promise<[user | undefined, number, string]> {
  const rawResponse = await fetch(
    LocalIp + "/react-native-household-app/us-central1/webApi/users/signin",
    {
      method: "POST",
      headers: {
        Accept: "application/json,text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  if (rawResponse.status === 200) {
    const user: user = await rawResponse.json();
    return [user, rawResponse.status, "ok"];
  }
  return [undefined, rawResponse.status, await rawResponse.text()];
}
