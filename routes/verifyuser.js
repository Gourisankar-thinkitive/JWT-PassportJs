const router      = require('express').Router();
const User        = require('./DB/model');
const verifyToken = require('./verifyToken');
const passport        = require('passport');



router.get('/',passport.authenticate('jwt',  { session: false }),

    (req, res) => {
        res.json({
          message: 'You made it to the secure route',
          user: req.user,
          token: req.query.token
        })

})


module.exports = router;