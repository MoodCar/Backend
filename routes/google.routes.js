module.exports = (app) => {
  const passport = require("passport");

  // google login 화면
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  // google login 성공과 실패 리다이렉트
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/fail",
      successRedirect: "/auth/google/success"
    }),
  );

  app.get("/auth/google/fail",(req,res) => {
    res.redirect("/auth/google");
  });

  app.get("/auth/google/success",(req,res) => {
    res.status(200).send(req.user);
  });

  // logout
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/google");
  });
};
