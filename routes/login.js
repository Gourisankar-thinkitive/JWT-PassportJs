const router    = require('express').Router();
const db        = require('./DB/db');
const bcrypt    = require('bcrypt');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const User      = require('./DB/model');




router.post('/login', async (req, res, next)=>{
    passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
                var token = jwt.sign({id:user._id}, 'my_secret_token',{
                                    expiresIn: 86400
                                });
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );
  

    // User.findOne({
    //     username:req.body.username
    // }, (err, user)=>{
    //     if(err) throw err;
    //     if(user === null)
    //     {
    //         res.json({
    //             message:"Invalid username"
    //         });
    //     }
    //     else
    //     {
    //         var result = bcrypt.compare(user.password, req.body.password);
    //         console.log(result);
    //         if(!result)
    //         {
    //             res.json({
    //                 message:"wrong password"
    //             })
    //         }
    //         else
    //         {
    //             var token = jwt.sign({id:user._id}, 'my_secret_token',{
    //                 expiresIn: 86400
    //             });
    //             res.json({user,token});
    //         }
    //     }


        
    //     })

    



module.exports = router;