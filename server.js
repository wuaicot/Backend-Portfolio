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

app.use(contactRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
