import { app } from "./app.js";
import { Database } from "./db.js";

const db = new Database();

// Create a button
app.get("/api/buttons/create", async (req, res) => {
    const { name, value } = req.query;

    if (!name || !value) {
        res.sendStatus(400);
        return;
    }

    try {
        const newButton = await db.createButton(name as string, value as unknown as number);
        res.status(200).send(newButton);
        // res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Delete a button
app.get("/api/buttons/delete/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(400);
        return;
    }

    try {
        await db.deleteButton(parseInt(id, 10));
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Get all buttons
app.get("/api/buttons", async (req, res) => {
    try {
        const buttons = await db.getAllButtons();
        res.send(buttons);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Get a button by id
app.get("/api/buttons/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(400);
        return;
    }

    try {
        const button = await db.getButton(parseInt(id, 10));
        res.send(button);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
