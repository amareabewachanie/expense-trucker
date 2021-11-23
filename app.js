const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const app = express();

/**
 * Using Middleware
 */
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
/**
 *  Passport middleware
 */
app.use(passport.initialize());

/**
 * Passport config
 */
require('./utils/passport')(passport);

// Configure Cors
app.use(cors());
/**
 * Import router handlers
 */

const authRoute = require('./routes/authRoute');
const expenseRoute = require('./routes/expenseRoute');

/**
 * Mounting the routers
 */

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/expenses/', expenseRoute);

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello from the server, you are well come 👋 ',
  });
});

module.exports = app;
