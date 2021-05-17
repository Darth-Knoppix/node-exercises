import crypto from "crypto";
import { v4 as uuid } from "uuid";

const HASH_SECRET = process.env.HASH_SECRET || "DEFAULT_TOKEN";

let users = []; // in-memory users

export function hashPassword(password) {
  return crypto
    .createHmac("sha256", HASH_SECRET)
    .update(password)
    .digest("hex");
}

export function create(user) {
  const dbUser = { ...user, id: uuid() };
  users.push(dbUser);
  return dbUser;
}

export function get(user) {
  return users.find(
    (x) => x.username === user.username && x.password === user.password
  );
}

export function getById(id) {
  return users.find((x) => x.id === id);
}

export function exists(user) {
  return users.filter((x) => x.username === user.username).length > 0;
}
