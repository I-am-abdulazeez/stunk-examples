import { asyncChunk } from "stunk";

type Users = {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string
}

export const usersChunk = asyncChunk(async () => {
  const res = await fetch("https://randomuser.me/api/?results=10");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const json: { results: Users[] } = await res.json();

  return json.results.map((user) => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
  }));
});
