const router = require('express').Router();
const bcrypt = require('bcrypt');
const Model = require('./DB/model');


router.post('/register', async (req, res)=>{
    
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const User = new Model({
        username:req.body.username,
        password:hashedPassword
    });
    
    User.save().then(()=>{
        res.json({
            register:true
        })
    }).catch(()=>{
        res.json({
            register:false
        })
    });
    
});


module.exports = router;