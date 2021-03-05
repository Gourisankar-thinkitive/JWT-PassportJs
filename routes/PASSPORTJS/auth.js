
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../DB/model');


module.exports = function(passport) {

  passport.use(new localStrategy((username,password, done)=>{

      User.findOne({username:username}, (err, user) =>{
          if(err) throw err;
          if(!user){
              return done(null, false, {message:'invalid username'});
          }
          bcrypt.compare(password, user.password, (err, result) => {
              if(err) throw err;
              if(result === true)
              {
                  return done(null, user, {message:'login succesfull'});
              }
              else
              {
                  return done(null, false, {message:'wrong password'});
              }
          });
      });

  })
);


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


passport.use(
  new JwtStrategy(opts, 
    (jwtPayload,done)=>{
      console.log('jwtPayload.sub: '+jwtPayload.sub);

      User.findOne({
        _id:jwtPayload.sub
        }, (err, result)=>{
          console.log(result)
          
          return done(null, result);
        })

}));









};

