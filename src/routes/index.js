import {Router} from 'express'
import nodemailer from 'nodemailer'
import config from '../config/index.js'

const routes = Router()

const transport = {
    host: "smtp.mail.yahoo.com",
    port: 587,
    auth:{
        user: config.EMAIL,
        pass: config.EMAIL_PASSWORD
    }
}

var transporter = nodemailer.createTransport(transport)
transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

routes.post("/email", (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let message = req.body.message
    let content = `name: ${name}\nemail: ${email}\nmessage: ${message}`
    let mail = {
        from: config.EMAIL,
        to: config.EMAIL,
        subject: "New Message from Contact Form",
        text:content
    }
    let autoReply = {
        from: config.EMAIL,
        to: email,
        subject: "Your message on my website was sent (autoreply)",
        text: `Hello, ${name}\n\nthank you for leaving a message on my website. I will review it shortly and reply if need be.\n\nRegards,\nKarim Alomerović`
    }
    transporter.sendMail(mail, (err) => {
        if (err){
            console.log(err)
            res.status(500)
            res.end()
        }else{
            console.log("Email sent.")
            transporter.sendMail(autoReply, (err) => {
                if (err){
                    console.log(err)
                    res.status(500)
                    res.end()
                }
                else{
                    res.status(200)
                    res.end()
                    console.log("Autoreply sent.");
                }
            })
        }
    })
})

export default routes