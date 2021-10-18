import user from "../../Service/user/User";

// A mock function to mimic making an async request for data
export function LogIn(email: string, password: string) {
  return new Promise<{ data: user }>(async (resolve) => {
    console.log("stringify", JSON.stringify({ email, password }));

    // const rawResponse = await
    fetch(
      "https://us-central1-react-native-household-app.cloudfunctions.net/webApi/users/signin",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )
      .then((data) => {
        console.log("Success:");
      })
      .catch((error) => {
        console.error("Error:");
      });

    // console.log("rawResponse", rawResponse);
    // console.log("json", await rawResponse.json());

    // const user: user = await rawResponse.json();
    // resolve({ data: user });
  });
}
