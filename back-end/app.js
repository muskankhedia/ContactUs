const app = require('express')(),
    port  = process.env.PORT || 5000,
    url = '0.0.0.0';

var smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS: true,
    auth: {
        user: "muskan.khedia2000@gmail.com",
        pass: "poiuytmnbv"
    }
});

    app.get('/', (req,res) => {
        res.send('this is working')
    })

    app.post('/send', (req,res) => {
        var mailOptions={
            to : req.query.to,
            subject : req.query.subject,
            text : req.query.text
         }
         console.log(mailOptions);

         smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
            throw(error)
         }else{
            console.log("Message sent: " + response.message);
            res.end()
         }
         });
    })

const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
})
    
