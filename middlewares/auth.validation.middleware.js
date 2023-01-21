function isAuthenticated(req, res, next) {

   if (req.session.user) {
      return next();
   }

   req.session.error = "Not authenticated";
   res.redirect("/api/auth/login");
}

export default isAuthenticated;