import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
const { FRONTEND_URL }= process.env;
import contactRoute from './api';
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());


app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(contactRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});