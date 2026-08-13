const express = require('express');

const router = express.Router();

const { createHabit, getHabits, getHabitById, updateHabit, deleteHabit } = require('../controllers/habits');

const authMiddleware = require('../middleware/authenticate');

router.post('/', authMiddleware, createHabit);
router.get('/', authMiddleware, getHabits);

router.get('/:id', authMiddleware, getHabitById);
router.put('/:id', authMiddleware, updateHabit);
router.delete('/:id', authMiddleware, deleteHabit);
module.exports = router;