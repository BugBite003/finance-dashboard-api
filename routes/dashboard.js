const express = require('express');
const { getDashboard } = require('../controllers/dashboardController.js');
const { protect } = require('../middleware/auth.js');
const { authorize } = require('../middleware/roles.js');

const router = express.Router();

router.use(protect);
router.use(authorize(['analyst', 'admin']));

router.get('/', getDashboard);

module.exports = router;
