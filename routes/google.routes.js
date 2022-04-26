const res = require("express/lib/response");

module.exports = (app) => {
  const passport = require("passport");

  // google login 화면
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  // google login 성공과 실패 리다이렉트 라우트 지정
  app.get(
    "/auth/google/callback",
      passport.authenticate("google", {
        failureRedirect: "/auth/google/fail"
      }),
      function(req,res){
        console.log(req.query);
        res.status(200).redirect("http://localhost:3000");
      }
  );

  // login 실패 시 로그인창으로 다시 redirect
  app.get("/auth/google/fail",(req,res) => {
    res.redirect("/auth/google");
  });


  // logout
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/google");
  });

  // login check 
  app.get("/checklogin", (req,res) => {

    if(!req.user){
      res.status(400).send({
        isSuccess : false,
        code : 400,
        message : "Login Required."
      })
    }
    else{
      res.json(req.user);
    }
  })
};
