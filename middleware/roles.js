const { protect } = require('./auth.js');

const authorize = (...roles) => {
  return [protect, (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} is not authorized to access this resource. Required roles: ${roles.join(', ')}` });
    }
    next();
  }];
};

module.exports = { authorize };
