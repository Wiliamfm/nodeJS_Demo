function isAuthenticated(req, res, next) {
   if (req.session.user) {
      return next();
   }
   req.session.error = "Not authenticated";
   return res.status(401).send(req.session.error);
}

export default isAuthenticated;