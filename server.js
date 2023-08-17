const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require('cors');
const   contactRoute  = require('./externed');
// const { NETLIFY_DOMAIN } = process.env;
//require('dotenv').config();
require('./db')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");  
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Permissions-Policy", "ch-ua-form-factor");
  next();
});
app.use(cors());
app.use('/externed',contactRoute);

 app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;

 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//process.env.FRONTEND_URL

 //res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 

 //origin: 'https://capable-platypus-f7f625.netlify.app',
 
 // res.header("Access-Control-Allow-Origin", `${ NETLIFY_DOMAIN }`);
 //