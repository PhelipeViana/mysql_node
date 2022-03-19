const express = require('express')
const app = express();
const porta = 3000;
const session = require('express-session');
const Controller=require('./Controller/Controller')

app.use(session({
    secret: 'phelipe',
    resave: false,
    saveUninitialized: false,
}))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
//app.use(express.json())

app.post('/login',Controller.Login)

app.get('/', function (req, res) {
    res.render('../views/index');
   
})

app.get('/teste', function (req, res) {
    if (!req.session.login) {
        res.redirect('/');
        console.log('tentou entrar na pagina restrita')
    } else {
        res.render('../views/teste')
    }

})

app.listen(porta, () => { console.log(`porta ${porta}`) })