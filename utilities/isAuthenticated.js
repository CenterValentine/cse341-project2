function isAuthenticated(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
  }
  return res.status(401).json({ message: "Unauthorized: You do not have access to this resource." });
}
  
  module.exports = isAuthenticated;
  