const router      = require('express').Router();
const User        = require('./DB/model');
const verifyToken = require('./verifyToken');




router.get('/me',

    (req, res, next) => {
        res.json({
          message: 'You made it to the secure route',
          user: req.user,
          token: req.query.secret_token
        })

})


module.exports = router;