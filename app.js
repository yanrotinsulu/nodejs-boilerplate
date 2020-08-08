const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = 3000;
const users = require('./routes/users');
const auths = require('./routes/auths');

//app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'FyprBoilerplate', resave: false, saveUninitialized: false, cookie:{secure:false} }));
app.use(passport.initialize());
app.use(passport.session());

require('./data/config/passport')(passport);

app.use(function (error, request, response, next) {
    console.error(error.stack);
    response.status(400).send(error.message);
});

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/users', users);
app.use('/auths', auths);

app.listen(port, () => console.log('Fypr NodeJS-Boilerplate app listening at http://localhost:${port}'))