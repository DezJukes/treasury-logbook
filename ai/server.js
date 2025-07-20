// ai/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleLogbookQuery } from './ragAgent.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  const { prompt } = req.body;
  const result = await handleLogbookQuery(prompt);
  res.json({ result });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`AI server running on http://localhost:${PORT}`));
