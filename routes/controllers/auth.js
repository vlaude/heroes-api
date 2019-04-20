const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { getUserById } = require('./users');

const jwtStrategy = opts =>
  new Strategy(opts, (jwtPayload, done) => {
    getUserById(jwtPayload)
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
        return null;
      })
      .catch(err => done(err, false));
  });

const initAuth = () => {
  const opts = {};
  opts.secretOrKey = process.env.JWT_SECRET;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  passport.use(jwtStrategy(opts));
};

const isAuthenticated = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('UNAUTHORIZED USER'));
    }
    req.user = user;
    return next();
  })(req, res, next);

module.exports = {
  initAuth,
  isAuthenticated,
};
