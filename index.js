const express = require('express')
const app = express();
const porta = 3000;
const Controller = require('./Controller/Controller')
const jwt = require('jsonwebtoken');
const SECRET = 'phelipe';

function VerifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) return res.status(401).end();
        req.userId = decoded.userId
        next();
    });


}
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/login', Controller.Login)
app.get('/logout', function (req, res) {
    blacklist.push(req.headers['x-access-token'])
    res.end()
})
app.get('/', function (req, res) {
    res.render('../views/index');

})

app.get('/teste', VerifyJWT, function (req, res) {
    //console.log(VerifyJWT)
    res.render('../views/teste')
})

app.listen(porta, () => { console.log(`porta ${porta}`) })