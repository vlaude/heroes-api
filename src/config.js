const userRoles = {
  USER: 1,
  ADMIN: 3,
  SUPADMIN: 4,
};

const accessLevels = {
  USER: userRoles.SUPADMIN || userRoles.ADMIN || userRoles.USER,
  ADMIN: userRoles.ADMIN || userRoles.SUPADMIN,
  SUPADMIN: userRoles.SUPADMIN,
};

module.exports = { userRoles, accessLevels };
