module.exports = (app) => {
  const passport = require("passport");
  const fs = require("fs");

  /*
    //구글 로그인 버튼 클릭시 구글 페이지로 이동하는 역할
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['email','profile'] }));


    //구글 로그인 후 자신의 웹사이트로 돌아오게될 주소 (콜백 url)
    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    function(req, res) {
        res.redirect('/');
    });

    app.get('/auth/logout',(req,res,next)=>{
        req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
         res.redirect('/');
        });
    });
    */

  // login 화면
  // 이미 로그인한 회원이라면(session 정보가 존재한다면) main화면으로 리다이렉트
  app.get("/login", (req, res) => {
    if (req.user) return res.redirect("/");
    fs.readFile("./webpage/login.html", (error, data) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  });

  // login 화면
  // 로그인 하지 않은 회원이라면(session 정보가 존재하지 않는다면) login화면으로 리다이렉트
  app.get("/", (req, res) => {
    if (!req.user) return res.redirect("/login");
    fs.readFile("./webpage/main.html", (error, data) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  });

  // google login 화면
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  // google login 성공과 실패 리다이렉트
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login"
    }),
    function(req,res){
        console.log(req.user);
        res.redirect("/");
    }

  );

  // logout
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });
};
