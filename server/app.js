const express = require('express')
const cookieparser = require('cookie-parser')
const morgan = require('morgan')
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(morgan('dev'));
app.use("/healthz", (_, res, next) => {
  res.status(200).send(`OK`);
  next();
});
module.exports = app
