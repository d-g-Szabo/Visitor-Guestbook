import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = 8008;

const dbConnectionString = process.env.DATABASE_URL;

export const db = new pg.Pool({ connectionString: dbConnectionString });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Create an API POST route to accept the text from your message input form
app.post("/message", async (req, res) => {
  const text = req.body;
  console.log("Received message:", text);
  const query = `
  INSERT INTO Messages (Username, Message)
  VALUES ($1, $2)`;

  try {
    const result = await db.query(query, [text.username, text.message]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create an API GET route to retrieve all messages from the database
app.get("/messages", async (req, res) => {
  const query = `SELECT * FROM Messages`;

  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
