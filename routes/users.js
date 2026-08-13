const express = require('express');

const router = express.Router();

const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/users');

const authMiddleware = require('../middleware/authenticate');

router.post('/', authMiddleware, createUser);
router.get('/', authMiddleware, getUsers);

router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
module.exports = router;