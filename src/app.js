const express = require('express');
const path =require('path');
const app = express();
const port = 8000;
const hbs= require('hbs');
const nodemailer= require('nodemailer');

//join public static path to this main file
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views")
const partial_path= path.join(__dirname,"../templates/partials")

app.set('view engine','hbs');
app.set('views',template_path);
hbs.registerPartials(partial_path);

app.use(express.urlencoded());

//express uses the static code
app.use(express.static(static_path));

    //nodemailer code
    var transporter = nodemailer.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'ranjuanil04',
            pass:'9045585047'
        }
    });

app.post('/create-data',(req,res)=>{
    console.log(req.body.emailid);

    var mailOption ={
        from:'ranjuanil04@gmail.com',
        to:'akshantarbishnoi279@gmail.com',
        subject:'sending mail from weather',
        text:`sender email:${req.body.emailid} 
              sender phoneno is ${req.body.phoneno}
              address is ${req.body.address}`
    };

    transporter.sendMail(mailOption,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('email sent '+info.response);
        }
    });
    res.render('about');
})

//routing
app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/about",(req,res)=>{
    res.render('about')
})

app.get("/weather",(req,res)=>{
    res.render('weather')
})



app.listen(port,()=>{
    console.log(`listeening on the port ${port}`);
});