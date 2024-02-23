const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userRouter = require('./routes/userRoutes');
const prodRouter = require('./routes/prodRoutes');
const checkoutRouter = require('./routes/checkoutRoutes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/prods', prodRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/checkout', checkoutRouter);

module.exports = app;
