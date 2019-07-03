const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { getUserById } = require('../builders/user.builder');

// Setting up passport strategy
const jwtStrategy = opts =>
    new Strategy(opts, (jwtPayload, done) => {
        getUserById(jwtPayload.sub)
            .then(user => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
                return null;
            })
            .catch(error => done(error, false));
    });

// Setting up passport configuration
const initAuth = () => {
    const opts = {};
    opts.secretOrKey = process.env.JWT_SECRET;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    passport.use(jwtStrategy(opts));
};

// Middleware that check jwt on Bearer authorization.
const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.sendStatus(403);
        }
        req.user = user;
        return next();
    })(req, res, next);
};

// Middleware that allow resources access by role.
const allowOnly = (accessLevel, done) => {
    return (req, res) => {
        if (accessLevel > req.user.role) {
            res.sendStatus(403);
            return;
        }
        done(req, res);
    };
};

module.exports = { initAuth, isAuthenticated, allowOnly };
