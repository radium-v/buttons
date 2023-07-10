import path from "path";
import sqlite3 from "sqlite3";

import { type Button } from "./interfaces.js";

import { Queries } from "./queries.js";

export class Database {
    #db: sqlite3.Database;
    #filename: string;

    cachedButtons: Button[] = [];

    async init(filepath: string) {
        this.#filename = path.resolve(filepath);
        this.#db = new sqlite3.Database(this.#filename);

        await this.createButtonsTable();

        return this;
    }

    createButtonsTable() {
        return new Promise<void>((resolve, reject) => {
            this.#db.run(Queries.CreateButtonsTable, err => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    getAllButtons() {
        return new Promise<any[]>((resolve, reject) => {
            this.#db.all<Button>(Queries.GetAllButtons, (err, rows) => {
                if (err) {
                    reject(err);
                }

                this.cachedButtons = rows;

                resolve(rows);
            });
        });
    }

    createButton(name: string, value: number) {
        return new Promise<void>((resolve, reject) => {
            this.#db.run(Queries.CreateButton, [name, value], err => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    deleteButton(id: number) {
        return new Promise<void>((resolve, reject) => {
            this.#db.run(Queries.DeleteButton, [id], err => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }
}
