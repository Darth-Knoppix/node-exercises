import express from "express";

import cors from "cors";
import * as UserService from "./service/user.mjs";
import * as AuthService from "./service/auth.mjs";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.port || 8080;

function getUserFromRequest(req) {
  return {
    username: req.body.username,
    password: UserService.hashPassword(req.body.password),
  };
}

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.post("/user", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Both `username` and `password` must be specified");
  }

  const user = getUserFromRequest(req);
  if (UserService.exists(user)) {
    res.status(403).send(`${user.username} exists`);
  } else {
    UserService.create(user);
    res.status(204).send();
  }
});

app.post("/login", (req, res) => {
  const user = UserService.get(getUserFromRequest(req));

  if (!user) {
    res.status(401).send();
    return;
  }

  res.status(200).send({ accessToken: AuthService.createToken(user) });
});

// Public resources
app.get("/about", (req, res) => {
  res.status(200).send("JWT server test");
});

// Private resources
app.get("/dashboard", AuthService.requireAuth, (req, res) => {
  const userId = AuthService.getUserIdFromToken(req.headers.authorization);
  if (!userId) {
    res.status(403).send(`User doesn't exist`);
    return;
  }

  const user = UserService.getById(userId);

  if (!user) {
    res.status(404).send(`User doesn't exist`);
    return;
  }
  res.status(200).send(`User dashboard for ${user.username}`);
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.info(`JWT server running on ${PORT}`);
});
