import fs from "fs";
import path from "path";
import { expect, test } from "@playwright/test";

import { Database } from "./db.js";

test.describe("Database", () => {
    test("should create a default database file when no filename is provided", async () => {
        const dbPath = path.resolve(__dirname, "./data/db.sqlite");

        fs.rmSync(dbPath, { force: true });

        expect(fs.existsSync(dbPath)).toBe(false);

        const db = new Database();

        await db.init();

        expect(fs.existsSync(dbPath)).toBe(true);

        fs.rmSync(dbPath);
    });

    test("should create a database file when a filename is provided", async () => {
        const dbPath = path.resolve(__dirname, "./db.sqlite");

        fs.rmSync(dbPath, { force: true });

        expect(fs.existsSync(dbPath)).toBe(false);

        const db = new Database({ filename: dbPath });

        await db.init();

        expect(fs.existsSync(dbPath)).toBe(true);

        fs.rmSync(dbPath);
    });
});
