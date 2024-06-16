import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS Messages (
  id SERIAL PRIMARY KEY,
  Username VARCHAR(255),
  Message TEXT
)`);

db.query(`INSERT INTO Messages (Username, Message)
    VALUES ('Daniel83', 'Hello, World!'),
    ('Greg72', 'Goodbye, World!'),
    ('David23', 'Valour is the only virtue that makes all other virtues possible.'),
    ('FerrariLover55', 'The best car in the world is a Ferrari.')`);
