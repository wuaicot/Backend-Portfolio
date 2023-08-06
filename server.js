const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const   router  = require('./externed');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

app.use(cors({
    
  origin: 'http://localhost:3000/contact',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('/contact', router);
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//process.env.FRONTEND_URL

