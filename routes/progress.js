const express = require('express');

const router = express.Router();

const {
    createProgress,
    getProgress,
    getProgressById,
    updateProgress,
    deleteProgress
} = require('../controllers/progress');

const authMiddleware = require('../middleware/authenticate');

router.post('/', authMiddleware, createProgress);
router.get('/', authMiddleware, getProgress);

router.get('/:id', authMiddleware, getProgressById);
router.put('/:id', authMiddleware, updateProgress);
router.delete('/:id', authMiddleware, deleteProgress);

module.exports = router;