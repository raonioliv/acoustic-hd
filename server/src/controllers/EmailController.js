const { 
  MailerSend, 
  EmailParams, 
  Sender,
  Recipient 
} = require('mailersend')
const config = require('../config/config')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const mailerSend = new MailerSend({
   apiKey: config.email.apikey
})

module.exports = { 
  async sendEmail(req, res, next) { 
    try {
      const templatePath = path.resolve(__dirname, '../templates/mail/resetPasswordEmail.ejs')
      const template = fs.readFileSync(templatePath, 'utf-8')
      const data = { 
        firstName: req.user.firstName,
        resetUrl: `${config.clientBaseUrl}/password-reset?token=${req.temporaryToken}&username=${req.user.firstName}`
      }

      const sentFrom = new Sender(
        config.email.customerServiceEmail, 'Acoustic HD'
      )

      const recipients = [
        new Recipient(req.user.email, req.user.firstName)
      ]

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject('Mudar senha - AcousticHD')
        .setHtml(ejs.render(template, data))
        .setText('This is the text content');
      
      await mailerSend.email.send(emailParams)
      res.status(200).send({ 
        msg: emailParams
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({ 
        msg: 'Falha ao enviar o email'
      })
    }
  }
}