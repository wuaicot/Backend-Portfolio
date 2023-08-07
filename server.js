const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const   contactRoute  = require('./externed');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors({
   
  origin: process.env.NETLIFY_DOMAIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('/externed',contactRoute);
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//process.env.FRONTEND_URL

 //origin: 'http://localhost:3000',
 //origin: 'https://capable-platypus-f7f625.netlify.app',