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

const db = new pg.Pool({ connectionString: dbConnectionString });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
