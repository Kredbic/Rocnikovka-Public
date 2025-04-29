// Load Required Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // Import database connection
const cors = require('cors');

// Load Routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var mailRouter = require('./routes/email');
var reviewRouter = require("./routes/review");

// Create Express App
var app = express();

// Connect to MongoDB
connectDB();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Define Routes
app.use('/', indexRouter);
app.use('/api/auth', userRouter);
app.use('/api', mailRouter)
app.use("/api/review", reviewRouter);

// Catch 404 and Forward to Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Export App
module.exports = app;
