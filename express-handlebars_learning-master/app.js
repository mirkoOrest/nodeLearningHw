const express = require('express');
const exprsBars = require('express-handlebars');
const path = require('path');

const app = express();

const users = [];

app.use(express.json());
app.use(express.urlencoded());

express.static(path.join(__dirname, 'views'))

app.engine('.hbs', exprsBars({
    defaultLayout: false,
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res) => {
    res.render('hello')
});

app.get('/users', (reg,res) => {
    res.render('users',{users})
})

app.get('/register',(req,res) => {
    res.render('register')
});

app.post('/reg', (req, res) => {

    const isUserReg = users.some(value => {
        return  value.eMail === req.body.eMail
    })

    if (users.length === 0){
        users.push(req.body)
        res.end('You have successfully registered')
    }else if (isUserReg){
        res.end('choose another e-mail')
    }else {
        users.push(req.body)
        res.end('You have successfully registered')
    }

});

app.get('/login', (req,res) =>{
    res.render('login')
});

app.post('/log', (req,res) => {

    const isUserLogin = users.some(value => {
        return value.eMail === req.body.eMail && value.password === req.body.password
    })

    if (isUserLogin){
        res.end('welcome')
    }else {
        res.end('e-mail or password is incorrect')
    }
})

app.listen(5000, (err) => {
    if (err){
        console.log(err)
    }else {
        console.log('is running...')
    }
});
