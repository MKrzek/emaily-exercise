//we require original npm module here not the file
const passport = require("passport");
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    }),
    console.log('logged in ')
  );
  app.get("/auth/google/callback", passport.authenticate("google"),
    (req, res) => {
      res.redirect('/surveys')
    }
  );
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
