const router    = require('express').Router();
const db        = require('./DB/db');
const bcrypt    = require('bcrypt');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const User      = require('./DB/model');
// require('./PASSPORTJS/passportConfig')(passport);



router.post('/login', async (req, res, next)=>{


        passport.authenticate('local', {session:false}, (err, user, info)=>{
            if(err) 
            {
                console.log(info.message);
                return res.status(500).json({message:info.message});
            }
            if(!user)
            {
                console.log(info.message);
                return res.status(500).json({message:info.message});
            }


            const payload = {
                username:user.username,
                id:user._id
            };

            console.log(user._id);

            var token = jwt.sign(payload,  'secret',{subject:user._id+"",expiresIn:3600});

            res.cookie('myCookie','Looks Good');
            res.json({user,token}).end;
        })(req,res,next);






});
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
    //         console.log('result:'+result);
    //         if(!result)
    //         {
    //             res.json({
    //                 message:"wrong password"
    //             })
    //         }
    //         else
    //         {
    //             var token = jwt.sign(user.toJSON(), 'secret',{
    //                 expiresIn: 86400
    //             });
    //             res.json({user,token});
    //         }
    //     }


        
    //     })
    // });

    



module.exports = router;