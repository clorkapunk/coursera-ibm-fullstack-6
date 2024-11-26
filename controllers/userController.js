const users = require('../models/users');

const registerUser = (req, res) => {
    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.json({ message: "User registered successfully" });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
};

module.exports = {
    registerUser,
    loginUser
};
