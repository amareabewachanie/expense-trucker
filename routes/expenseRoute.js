const express = require('express');
const passport = require('passport');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    expenseController.getExpenses
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    expenseController.saveExpense
  );
router
  .route('/:id')
  .patch(
    passport.authenticate('jwt', { session: false }),
    expenseController.updateExpense
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    expenseController.deleteExpense
  )
  .get(
    passport.authenticate('jwt', { session: false }),
    expenseController.getExpense
  );
module.exports = router;
