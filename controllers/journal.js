const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connect');

const createJournal = async (req, res) => {
    try {
        const {
            userId,
            date,
            title,
            content,
            mood,
            energyLevel,
            gratitude
        } = req.body;

        if (
            !userId ||
            !date ||
            !title ||
            !content ||
            !mood ||
            energyLevel === undefined ||
            !gratitude
        ) {
            return res.status(400).json({
                message: 'All journal fields are required.'
            });
        }

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }

        const db = getDB();

        const user = await db.collection('users').findOne({
            _id: new ObjectId(userId)
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        const newJournal = {
            userId: new ObjectId(userId),
            date,
            title,
            content,
            mood,
            energyLevel,
            gratitude,
            createdAt: new Date()
        };

        const result = await db.collection('journal').insertOne(newJournal);

        res.status(201).json({
            message: 'Journal entry created successfully.',
            journalId: result.insertedId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while creating the journal entry.'
        });
    }
};

const getJournals = async (req, res) => {
    try {
        const db = getDB();

        const journals = await db.collection('journal').find().toArray();

        res.status(200).json(journals);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving journal entries.'
        });
    }
};

const getJournalById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid journal ID.'
            });
        }

        const db = getDB();

        const journal = await db.collection('journal').findOne({
            _id: new ObjectId(id)
        });

        if (!journal) {
            return res.status(404).json({
                message: 'Journal entry not found.'
            });
        }

        res.status(200).json(journal);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving the journal entry.'
        });
    }
};

const updateJournal = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            userId,
            date,
            title,
            content,
            mood,
            energyLevel,
            gratitude
        } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid journal ID.'
            });
        }

        if (
            !userId ||
            !date ||
            !title ||
            !content ||
            !mood ||
            energyLevel === undefined ||
            !gratitude
        ) {
            return res.status(400).json({
                message: 'All journal fields are required.'
            });
        }

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }

        const db = getDB();

        const user = await db.collection('users').findOne({
            _id: new ObjectId(userId)
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        const updatedJournal = {
            userId: new ObjectId(userId),
            date,
            title,
            content,
            mood,
            energyLevel,
            gratitude
        };

        const result = await db.collection('journal').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedJournal }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Journal entry not found.'
            });
        }

        res.status(200).json({
            message: 'Journal entry updated successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while updating the journal entry.'
        });
    }
};

const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid journal ID.'
            });
        }

        const db = getDB();

        const result = await db.collection('journal').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Journal entry not found.'
            });
        }

        res.status(200).json({
            message: 'Journal entry deleted successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while deleting the journal entry.'
        });
    }
};

module.exports = {
    createJournal,
    getJournals,
    getJournalById,
    updateJournal,
    deleteJournal
};