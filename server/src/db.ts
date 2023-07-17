import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import type { Button } from "./interfaces.js";
import { Queries } from "./queries.js";

const defaultFilename = path.join(__dirname, "./data/db.sqlite");

export class Database {
    /**
     * The sqlite3 database instance.
     *
     * @private
     */
    #db: sqlite3.Database;

    /**
     * The path to the database file.
     *
     * @private
     */
    #filename: string;

    /**
     * A cache of all buttons in the database.
     *
     * @private
     */
    #cachedButtons: Button[] = [];

    /**
     * Creates a new database instance.
     *
     * @param filename - The path to the database file. Defaults to "./data/db.sqlite".
     * @public
     * @constructor
     * @returns A new database object instance.
     */
    constructor({ filename }: { filename?: string } = { filename: defaultFilename }) {
        this.#filename = path.resolve(filename);
    }

    /**
     * Creates a button in the database.
     *
     * @param name - The name of the button.
     * @param value - The value of the button.
     * @returns A promise that resolves to the created button.
     *
     * @public
     */
    public createButton(name: string, value: number) {
        return new Promise<Button>((resolve, reject) => {
            this.#db.get<Button>(Queries.CreateButton, [name, value], (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows);
            });
        });
    }

    /**
     * Creates the buttons table in the database.
     *
     * @returns A promise that resolves when the table is created.
     *
     * @public
     */
    private createButtonsTable() {
        return new Promise<void>((resolve, reject) => {
            this.#db.run(Queries.CreateButtonsTable, err => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    /**
     * Deletes a button from the database.
     *
     * @param id - The id of the button to delete.
     * @returns A promise that resolves when the button is deleted.
     *
     * @public
     */
    public deleteButton(id: number) {
        return new Promise<void>((resolve, reject) => {
            this.#db.run(Queries.DeleteButton, [id], err => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    /**
     * Gets all buttons from the database.
     *
     * @returns A promise that resolves to an array of buttons.
     * @public
     */
    public getAllButtons() {
        return new Promise<Button[]>((resolve, reject) => {
            this.#db.all<Button>(Queries.GetAllButtons, (err, rows) => {
                if (err) {
                    reject(err);
                }

                this.#cachedButtons = rows;

                resolve(rows);
            });
        });
    }

    /**
     * Gets a button from the database.
     *
     * @param id - The id of the button to get.
     * @returns A promise that resolves to the button.
     */
    public getButton(id: number) {
        return new Promise<Button>((resolve, reject) => {
            this.#db.get<Button>(Queries.GetButton, [id], (err, row) => {
                if (err) {
                    reject(err);
                }

                resolve(row);
            });
        });
    }

    /**
     * Initializes the database. Creates the database file and tables if they don't exist.
     *
     * @public
     */
    public async init() {
        try {
            fs.mkdirSync(path.dirname(this.#filename), { recursive: true });

            this.#db = new sqlite3.Database(this.#filename);
            await this.createButtonsTable();
        } catch (err) {
            console.log(err);
        }
    }
}
