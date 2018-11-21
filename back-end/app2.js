const app = require('express')(),
    port  = process.env.PORT || 3000,
    url = '0.0.0.0';
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "muskan.khedia2000@gmail.com",
        pass: "poiuytmnbv"
    }
});

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.post('/send',function(req,res){
    console.log(req)
    var mailOptions={
        to : req.query.to,
        text : req.query.text,
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
})
    
