const express = require('express');

const router = express.Router();

const {
    createJournal,
    getJournals,
    getJournalById,
    updateJournal,
    deleteJournal
} = require('../controllers/journal');

const authMiddleware = require('../middleware/authenticate');

router.post('/', authMiddleware, createJournal);
router.get('/', authMiddleware, getJournals);

router.get('/:id', authMiddleware, getJournalById);
router.put('/:id', authMiddleware, updateJournal);
router.delete('/:id', authMiddleware, deleteJournal);

module.exports = router;