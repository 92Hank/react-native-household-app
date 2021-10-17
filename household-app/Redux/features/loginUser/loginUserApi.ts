import user from "../../Service/user/User";

// A mock function to mimic making an async request for data
export function LogIn(email: string, password: string) {
  return new Promise<{ data: user }>(async (resolve) => {
    const rawResponse = await fetch(
      "http://localhost:5000/react-native-household-app/us-central1/webApi/users/signin",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const user: user = await rawResponse.json();
    resolve({ data: user });
  });
}
