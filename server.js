const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { FRONTEND_URL }= process.env;
const contactRoute = require('./api');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Add the CORS header to all responses
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