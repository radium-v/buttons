const CreateButtonsTable =
    "CREATE TABLE IF NOT EXISTS buttons (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value INTEGER NOT NULL)";

const GetAllButtons = "SELECT * FROM buttons";
const CreateButton = "INSERT INTO buttons (name, value) VALUES (?, ?)";
const DeleteButton = "DELETE FROM buttons WHERE id = ?";

export const Queries = {
    CreateButtonsTable,
    GetAllButtons,
    CreateButton,
    DeleteButton,
} as const;

export type Queries = (typeof Queries)[keyof typeof Queries];
