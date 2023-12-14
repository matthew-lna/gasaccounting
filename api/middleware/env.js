var config = require('../configurations/configurations.json');

module.exports = (req, res, next) => {
  try {
    req.configuration = config;
    next();
  } catch (error) {
    return res.status(401).json({
        message: 'middleware failed'
    });
  }
}