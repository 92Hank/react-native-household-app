import user from "./User";

// A mock function to mimic making an async request for data
export function fetchUsers() {
  return new Promise<{ users: user[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          users: [
            {
              id: "jhfgj",
              name: "hgfhg",
            },
            {
              id: "jhfgj2",
              name: "hgfhg2",
            },
          ],
        }),
      500
    )
  );
}
export function CreateUser(user: user) {
  return new Promise<boolean>((resolve) =>
    setTimeout(() => resolve(true), 500)
  );
}
