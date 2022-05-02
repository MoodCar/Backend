const express = require('express');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const passport = require('passport')
,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bodyParser = require('body-parser');
const cors = require('cors');

const googleconfig = require('./config/googleconfig.js');
const dbConfig_session = require("./config/dbconfig.session.js");
const {pool} = require("./models/db.js");

const app = express();

let corsOptions = {
    origin : 'http://localhost:3000',
    credentials:true
}
app.use(corsOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const options = {
    host: dbConfig_session.HOST,
    user: dbConfig_session.USER,
    password: dbConfig_session.PASSWORD,
    database: dbConfig_session.DB
}

const sessionStore = new MySQLStore(options);

//MIDDLEWARE
app.use(
    session({
        secret: "secret key",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
);

//PASSPORT - 전용 middleware 추가
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT - 직렬화 
//serializeUser : 로그인 / 회원가입 후 1회 실행
//deserializeUser : 페이지 전환시 마다 실행 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
	done(null, user);
});

//PASSPORT (Google) - 구글 로그인시 정보 GET
passport.use(new GoogleStrategy({
    clientID: googleconfig.client_id,
    clientSecret: googleconfig.client_secret,
    callbackURL: googleconfig.redirect_urls,
    passReqToCallback: true,
  },
async function(request, accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(profile);
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(`##### Connection_pool_GET #####`);

        try{
            const getGoogleUserQuery = "SELECT email,name,provider,providerId,token FROM user WHERE providerId = ?";
            let params = [profile.id];
            let [row] = await connection.query(getGoogleUserQuery,params);
            if(!row){
                let newUser = {
                    email : profile.emails[0].value,
                    name : profile.displayName,
                    provider : profile.provider,
                    providerId : profile.id,
                    token : accessToken,
                };
                try{
                    const makeNewUserQuery = "SELECT email,name,provider,providerId,token FROM user WHERE providerId = ?";
                    let params = [newUser.email,newUser.name,newUser.token,newUser.provider,newUser.providerId];
                    await connection.query(makeNewUserQuery,params);
                    connection.release();
                    return done(null,newUser);
                }catch{
                    connection.release();
                    console.log(err);
                }
            }
            else{
                connection.release();
                return done(null,row);
            }
        } catch(err){
            console.error(`##### getAllUser Query error ##### `);
            connection.release();
            return false;
        }
    }catch(err){
        connection.release();
        return done(err);
    } 

    /*sql.query("SELECT email,name,provider,providerId,token FROM user WHERE providerId = ?",[profile.id], 
    (err,user) => {
        if(err){
            return done(err);
        }
        else if(user[0]== undefined){

            let newUser = {
                email : profile.emails[0].value,
                name : profile.displayName,
                provider : profile.provider,
                providerId : profile.id,
                token : accessToken,
            };

            sql.query("INSERT INTO user (email,name,token,provider,providerId) VALUES ( ?,?,?,?,?)",
            [newUser.email,newUser.name,newUser.token,newUser.provider,newUser.providerId],(err,rows) => {
                if(err){
                    console.log(err);
                }
                return done(null,newUser);
            })
        }
        else{
            return done(null,user);
        }
    });*/
  }
));


app.get('/', (req, res) => res.json({message : "Server Linked!"}));
require("./routes/user.routes.js")(app);
require("./routes/google.routes.js")(app);
require("./routes/diary.routes.js")(app);



module.exports = app;