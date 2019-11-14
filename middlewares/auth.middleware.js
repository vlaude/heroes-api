const omit = require('lodash.omit');
const passport = require('passport/lib');
const { ExtractJwt, Strategy } = require('passport-jwt/lib');
const { getUserById } = require('../builders/user.builder');
const { Users } = require('../db');

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
      return next(new Error('unauthorized user'));
    }
    req.user = user;
    return next();
  })(req, res, next);

const loginUser = ({ username, password }) => {
  return Users.findOne({
    where: {
      username,
    },
  }).then(user =>
    user && !user.deletedAt
      ? Promise.all([
          omit(
            user.get({
              plain: true,
            }),
            Users.excludeAttributes
          ),
          user.comparePassword(password),
        ])
      : Promise.reject(new Error('unkown or deleted user'))
  );
};

module.exports = {
  initAuth,
  isAuthenticated,
  loginUser,
};
