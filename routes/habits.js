const express = require('express');

const router = express.Router();

const { createHabit, getHabits, getHabitById, updateHabit, deleteHabit } = require('../controllers/habits');

router.post('/', createHabit);
router.get('/', getHabits);

router.get('/:id', getHabitById);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);
module.exports = router;