const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connect');

const createProgress = async (req, res) => {
    try {
        const {
            habitId,
            userId,
            date,
            value,
            unit,
            completed,
            notes
        } = req.body;

        if (
            !habitId ||
            !userId ||
            !date ||
            value === undefined ||
            !unit ||
            completed === undefined ||
            !notes
        ) {
            return res.status(400).json({
                message: 'All progress fields are required.'
            });
        }

        if (!ObjectId.isValid(habitId)) {
            return res.status(400).json({
                message: 'Invalid habit ID.'
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

        const habit = await db.collection('habits').findOne({
            _id: new ObjectId(habitId)
        });

        if (!habit) {
            return res.status(404).json({
                message: 'Habit not found.'
            });
        }

        const newProgress = {
            habitId: new ObjectId(habitId),
            userId: new ObjectId(userId),
            date,
            value,
            unit,
            completed,
            notes,
            createdAt: new Date()
        };

        const result = await db.collection('progress').insertOne(newProgress);

        res.status(201).json({
            message: 'Progress created successfully.',
            progressId: result.insertedId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while creating progress.'
        });
    }
};

const getProgress = async (req, res) => {
    try {
        const db = getDB();

        const progress = await db.collection('progress').find().toArray();

        res.status(200).json(progress);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving progress.'
        });
    }
};

const getProgressById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid progress ID.'
            });
        }

        const db = getDB();

        const progress = await db.collection('progress').findOne({
            _id: new ObjectId(id)
        });

        if (!progress) {
            return res.status(404).json({
                message: 'Progress not found.'
            });
        }

        res.status(200).json(progress);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving progress.'
        });
    }
};

const updateProgress = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            habitId,
            userId,
            date,
            value,
            unit,
            completed,
            notes
        } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid progress ID.'
            });
        }

        if (
            !habitId ||
            !userId ||
            !date ||
            value === undefined ||
            !unit ||
            completed === undefined ||
            !notes
        ) {
            return res.status(400).json({
                message: 'All progress fields are required.'
            });
        }

        if (!ObjectId.isValid(habitId)) {
            return res.status(400).json({
                message: 'Invalid habit ID.'
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

        const habit = await db.collection('habits').findOne({
            _id: new ObjectId(habitId)
        });

        if (!habit) {
            return res.status(404).json({
                message: 'Habit not found.'
            });
        }

        const updatedProgress = {
            habitId: new ObjectId(habitId),
            userId: new ObjectId(userId),
            date,
            value,
            unit,
            completed,
            notes
        };

        const result = await db.collection('progress').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedProgress }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Progress not found.'
            });
        }

        res.status(200).json({
            message: 'Progress updated successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while updating progress.'
        });
    }
};

const deleteProgress = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid progress ID.'
            });
        }

        const db = getDB();

        const result = await db.collection('progress').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Progress not found.'
            });
        }

        res.status(200).json({
            message: 'Progress deleted successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while deleting progress.'
        });
    }
};

module.exports = {
    createProgress,
    getProgress,
    getProgressById,
    updateProgress,
    deleteProgress
};