const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = {
                    id: profile.id,
                    username: profile.username,
                    email:
                        profile.emails && profile.emails.length > 0
                            ? profile.emails[0].value
                            : null
                };

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

module.exports = passport;