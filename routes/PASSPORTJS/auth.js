const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT  = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTStrategy(
      {
        secretOrKey: 'my_secret_token',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
