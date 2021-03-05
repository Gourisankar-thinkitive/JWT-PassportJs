const express         = require('express');
const parser          = require('body-parser');
const cors            = require('cors');
const passport        = require('passport');
const passportLocal   = require('passport-local');
const cookieParser    = require('cookie-parser');
const session         = require('express-session');

const login           = require('./routes/login');
const register        = require('./routes/register');
const me              = require('./routes/verifyuser');
const app             = express();



// Middleware

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(cors({
    // origin: 'http://localhost:3000/'
}));
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/PASSPORTJS/auth")(passport);

// routes

app.use('/',login);
app.use('/', register);
app.use('/',me)


app.get('/user',(req, res) =>{
    console.log(req.headers.authorization);
    res.send(req.user);
})
app.listen(9090, ()=>{
    console.log('listening at 9090');
});


