const express = require('express');
const { 
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionsController.js');
const { protect } = require('../middleware/auth.js');
const { authorize } = require('../middleware/roles.js');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getTransactions).post(authorize('analyst', 'admin'), createTransaction);
router.route('/:id').put(authorize('analyst', 'admin'), updateTransaction).delete(authorize('analyst', 'admin'), deleteTransaction);

module.exports = router;
