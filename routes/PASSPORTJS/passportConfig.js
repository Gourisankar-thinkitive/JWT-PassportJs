const User = require('../DB/model');
const bcrypt = require('bcrypt');
// const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT  = require('passport-jwt').ExtractJwt;

module.exports = (passport) =>{

    var cookieExtractor = (req) =>{
        var token = null;
        if (req && req.cookies)
        {
            token = req.cookies['jwt'];
        }
        return token;
    };

    passport.use('login',
        new localStrategy((username,password, done)=>{

            User.findOne({username:username}, (err, user) =>{
                if(err) throw err;
                if(!user){
                    return done(null, false);
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result === true)
                    {
                        return done(null, user);
                    }
                    else
                    {
                        return done(null, false);
                    }
                });
            });

        })
    );
    
// passport.use(

    
//     new JWTStrategy(
//         {
//           secretOrKey: 'my_secret_token',
//           jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
//         },
//         async (token, done) => {
//           try {

//             console.log("token: "+token)
//             return done(null, token.user);
//           } catch (error) {
//               console.log(error)
//             done(error);
//           }
//         }
//       ));

    passport.serializeUser((user, cb)=>{
        cb(null, user.id);
    });

    passport.deserializeUser((id,cb)=>{
        User.findOne({_id:id}, (err, user)=>{
            cb(err, user);

        });
    });
}