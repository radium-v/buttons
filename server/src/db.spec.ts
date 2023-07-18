import fs from "fs";
import path from "path";
import { expect, test } from "@playwright/test";
import sqlite3 from "sqlite3";

import type { Button } from "./interfaces.js";
import { Database } from "./db.js";

test.describe("Database Initialization", () => {
    test("should create a default database file when no filename is provided", async () => {
        const dbPath = path.resolve(__dirname, "./data/db.sqlite");

        const dbDir = path.dirname(dbPath);

        fs.rmSync(dbPath, { force: true });

        expect(fs.existsSync(dbPath)).toBe(false);

        fs.rmSync(dbDir, { recursive: true, force: true });

        expect(fs.existsSync(dbDir)).toBe(false);

        const db = new Database();

        await db.init();

        expect(fs.existsSync(dbPath)).toBe(true);

        fs.rmSync(dbPath);

        fs.rmdirSync(path.dirname(dbPath));
    });

    test("should create a database file when a filename is provided", async () => {
        const filename = path.resolve(__dirname, "./db-test.sqlite");

        fs.rmSync(filename, { force: true });

        expect(fs.existsSync(filename)).toBe(false);

        const db = new Database({ filename: filename });

        await db.init();

        expect(fs.existsSync(filename)).toBe(true);

        fs.rmSync(filename);
    });

    test("should create a buttons table when initializing the database", async () => {
        const filename = path.resolve(__dirname, "./db-test.sqlite");

        let db = new Database({ filename });

        await db.init();

        db = null;

        const db2 = new sqlite3.Database(filename);

        const query = `SELECT name FROM sqlite_master WHERE type=? AND name=?;`;

        const result = await new Promise((resolve, reject) => {
            db2.get(query, ["table", "buttons"], (err, row) => {
                if (err) {
                    reject(err);
                }

                resolve(row);
            });
        });

        expect(result).toMatchObject({ name: "buttons" });

        db2.close();

        fs.rmSync(filename);
    });

    test("should add a button to the database when calling `createButton()`", async () => {
        const filename = path.resolve(__dirname, "./db-test.sqlite");

        let db = new Database({ filename });

        await db.init();

        const button = await db.createButton("test", 1);

        expect(button).toMatchObject({ name: "test", value: 1 });

        db = null;

        const db2 = new sqlite3.Database(filename);

        const query = `SELECT * FROM buttons WHERE id=?;`;

        const result = await new Promise((resolve, reject) => {
            db2.get(query, [button.id], (err, row) => {
                if (err) {
                    reject(err);
                }

                resolve(row);
            });
        });

        expect(result).toMatchObject({ name: "test", value: 1 });

        db2.close();

        fs.rmSync(filename);
    });
});
