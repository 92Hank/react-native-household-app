import user from "../user/User";

// A mock function to mimic making an async request for data
export function LogIn(userName: string, password: string) {
  return new Promise<{ data: user }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            id: "foo",
            email: "foo",
            firstName: "foo",
            isOwner: false,
            lastName: "foo",
          },
        }),
      500
    )
  );
}
