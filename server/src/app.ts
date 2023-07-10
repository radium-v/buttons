import express from "express";

import { Database } from "./db.js";

const app = express();

const db = new Database();
db.init("./db.sqlite");

// Create a button
app.get("/api/buttons/create", (req, res) => {
    const { name, value } = req.query;

    db.createButton(name, value)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

// Get all buttons
app.get("/api/buttons", (req, res) => {
    db.getAllButtons()
        .then(buttons => {
            console.log(buttons);
            res.send(buttons);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
