const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config({path:'.env'})
const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
    
})

app.post("/",function(req,res){
    let transporter = nodemailer.createTransport({
        service : "gmail",
        auth: {
            user: 'khareyash05@gmail.com',
            pass: process.env.pass
        }
    });
        
        // setup email data with unicode symbols
    let mailOptions = {
        from: '"Yash Khare" <khareyash05@gmail.com>', // sender address
        to: 'yash2010118@akgec.ac.in', // list of receivers
        subject: req.body.subject , // Subject line
        text: req.body.message // plain text body        
    };
        
        // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {    
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        console.log("sent");
    });
    res.send("Email sent..Thank you! We will revert back to you ASAP")
})

app.listen(3000,function(){
    console.log("server started");
})