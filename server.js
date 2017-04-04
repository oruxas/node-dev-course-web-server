const express = require('express');
const hbs = require('hbs'); //templating
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');//directory for partials
app.set('view engine', 'hbs');//set lets to set various express configs

//app.use registers middleware
//app.use(express.static(__dirname+'/public')); //takes absolute path to the server you want to serve up, __dirname stores path to projects directory(i.e. node-web-server)

app.use((req, res, next) =>{
    //next exist to tell middleware when your function is done. if no next handlers are never going to be fired
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next)=>{
//     res.render(('maintenance.hbs'));
// });

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrYet', ()=>{
    return new Date().getFullYear();
});


app.get('/', (req, res) =>{
   // res.send('Hello Express!');
   res.render('home.hbs', {
        // this 2nd argument is used to inject data
        pageTitle: 'HOME Page',
        welcomeMsg: 'HALLO TO THE'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        // this 2nd argument is used to inject data
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res)=>{
    var errorMessage = "non existant url";
    res.send({
        errorMessage : errorMessage
    });
});

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});

//NOTES
//app.get(route, functtion to run , what to send back to person whoo made request)
//Response HEaders
//content-type tells what type of data came back

//middleware lets configure how express app works
//app.use takes middleware function 

//app.listten takes second optional arg: what to do once server is up

//middleware is executed in order it's written. if something is being get before middleware without next it will be fetched only then it will stop.