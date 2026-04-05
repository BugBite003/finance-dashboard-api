const express = require('express');
const { getUsers, updateUser } = require('../controllers/usersController.js');
const { authorize } = require('../middleware/roles.js');

const router = express.Router();

router.use(authorize('admin'));

router.get('/', getUsers);
router.put('/:id', updateUser);

module.exports = router;
