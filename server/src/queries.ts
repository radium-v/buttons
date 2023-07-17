/**
 * The query used to create the buttons table.
 *
 * @public
 */
const CreateButtonsTable =
    "CREATE TABLE IF NOT EXISTS buttons (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value INTEGER NOT NULL)";

/**
 * The query used to get all buttons.
 * @public
 */
const GetAllButtons = "SELECT * FROM buttons";

/**
 * The query used to create a button.
 * @public
 */
const CreateButton = "INSERT INTO buttons (name, value) VALUES (?, ?)";

/**
 * The query used to delete a button.
 * @public
 */
const DeleteButton = "DELETE FROM buttons WHERE id = ?";

/**
 * The query used to get a button.
 * @public
 */
const GetButton = "SELECT * FROM buttons WHERE id = ?";

/**
 * The queries used to interact with the database.
 *
 * @public
 * @readonly
 */
export const Queries = {
    CreateButtonsTable,
    GetAllButtons,
    GetButton,
    CreateButton,
    DeleteButton,
} as const;

/**
 * The type of the queries used to interact with the database.
 *
 * @public
 * @readonly
 */
export type Queries = (typeof Queries)[keyof typeof Queries];
