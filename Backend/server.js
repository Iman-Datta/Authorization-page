const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let userId = 1;

app.post("/register", (req, res) => {
    const { username, firstName, lastName, password } = req.body;

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = {
        id: userId++,
        username,
        firstName,
        lastName,
        password,
    };

    users.push(newUser);
    res.status(201).json({ message: "Account created successfully!" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: `Welcome back, ${user.firstName}!` });
});

app.get("/users", (req, res) => {
    res.json(users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username
    })));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});