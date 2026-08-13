const express = require('express');
const passport = require('../config/passport');
const { githubCallback, logout } = require('../controllers/auth');

const router = express.Router();

router.get(
    '/github',
    passport.authenticate('github', {
        scope: ['user:email']
    })
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        session: false
    }),
    githubCallback
);

router.post('/logout', logout);

module.exports = router;