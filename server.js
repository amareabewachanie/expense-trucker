const dotenv = require('dotenv');
const mongoose = require('mongoose');
/**
 * Configure the environmental variable
 */
dotenv.config({ path: './config.env' });

/**
 * Import our application
 */
const app = require('./app');

/**
 * Connecting to mongodb
 */
const dbUrl = process.env.DATABASE_LOCAL;
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Databse connection success 👍 ');
  })
  .catch((err) => {
    console.log('DB connection Error', err);
  });
/**
 * Defining the port number
 */
const port = process.env.PORT || 3000;
/**
 * Start our express server
 */
app.listen(port, () => {
  console.log(`👍 App is running on port ${port}`);
});
