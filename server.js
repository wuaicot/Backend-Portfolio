const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoute = require('./api');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors({
  origin: 'https://capable-platypus-f7f625.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://capable-platypus-f7f625.netlify.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(contactRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
