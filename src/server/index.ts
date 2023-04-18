import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import { today, thisWeek, thisMonth, Post } from "../posts";
import { NewUser, User } from "../users";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

app.get("/posts", (req, res) => {
    res.json(allPosts);
});

app.post<{}, {}, Post>("/posts", (req, res) => {
    const post = { ...req.body, id: (Math.random() * 100000).toFixed() }; // add faker id here
    allPosts.push(post);
    res.json(post);
});

const SECRET = "my-secret";
const COOKIE = "vuejs-jwt";

function authenticate(id: string, req: Request, res: Response) {
    const token = jsonwebtoken.sign({ id }, SECRET, {
        issuer: "vue-js-course",
        expiresIn: "30 days",
    });
    res.cookie(COOKIE, token, { httpOnly: true });
}

app.post<{}, {}, NewUser>("/login", (req, res) => {
    const targetUser = allUsers.find((x) => x.username === req.body.username);

    if (!targetUser || targetUser.password !== req.body.password) {
        res.status(401).end();
    } else {
        authenticate(targetUser.id, req, res);
        res.status(200).end();
    }
});

app.post("/logout", (req, res) => {
    res.cookie(COOKIE, "", { httpOnly: true });
    res.status(200).end();
});

app.get("/current-user", (req, res) => {
    try {
        const token = req.cookies[COOKIE];
        const result = jsonwebtoken.verify(token, SECRET) as { id: string };
        res.json({ id: result.id });
    } catch (e) {
        res.status(404).end();
    }
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
    const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }; // add faker id here
    allUsers.push(user);
    authenticate(user.id, req, res);
    const { password, ...returnUser } = user;
    res.json({ ...returnUser });
});

app.listen(8000, () => {
    console.log("Server is now running on port 8000");
});
