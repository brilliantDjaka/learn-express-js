const express = require('express');
const app = express();
const os = require('os')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getYear',()=>new Date().getFullYear())
hbs.registerHelper('UpperIt',(text)=>text.toUpperCase())


app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`
   
    fs.appendFile('serverLog.txt',log + '\n',err => err?console.log(err):null);
    console.log(log);
    
    
    next();
})
// app.use((req,res,next)=>{
//     res.render('maintance.hbs',{
//         pageTitle:'Maintance'
//     })
// })
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
  res.render('home.hbs',{
      pageTitle:'Home',
      welcomeMessage:'Haloooo'
  })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About'
    })
})
app.get('/bad',(req,res)=>{
    res.send('unable to handle request')
})


app.listen(port,()=>console.log(`Server is running on port ${port}`))