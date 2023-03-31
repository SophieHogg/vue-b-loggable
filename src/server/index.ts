import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { today, thisWeek, thisMonth, Post } from "../posts";
import { NewUser, User } from "../users";

const app = express();
app.use(cors());
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

app.post<{}, {}, NewUser>("/users", (req, res) => {
    const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }; // add faker id here
    allUsers.push(user);
    const { password, ...returnUser } = user;
    console.log(returnUser);
    res.json({ ...returnUser });
});

app.listen(8000, () => {
    console.log("Server is now running on port 8000");
});
