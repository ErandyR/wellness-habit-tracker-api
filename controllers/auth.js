const jwt = require('jsonwebtoken');

const githubCallback = async (req, res) => {
    try {
        const user = req.user;

        const token = jwt.sign(
            {
                githubId: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: 'GitHub authentication successful.',
            token
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred during authentication.'
        });
    }
};

const logout = (req, res) => {
    res.status(200).json({
        message: 'Logout successful. Please discard your JWT token.'
    });
};

module.exports = {
    githubCallback,
    logout
};