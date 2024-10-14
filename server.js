//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const contactRoute = require('./externed');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));

//          FOR DEVELOPMENT ENVIRONMENT

//http://http://localhost:3000
//https://frontend-portfolio-production.up.railway.app/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend-portfolio-production.up.railway.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(cors());
app.use('/externed', contactRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;



// conn.sync({ force: false }).then(() => {
//   server.listen(PORT, '0.0.0.0', () => {
//     console.log(`listening at port ${PORT}`);
//   });
// });

 


//process.env.FRONTEND_URL

 //res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 

 //origin: 'https://capable-platypus-f7f625.netlify.app',
 
 // res.header("Access-Control-Allow-Origin", `${ NETLIFY_DOMAIN }`);
 //