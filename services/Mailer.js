//exports a class to upper case

const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
        this.from_email = new helper.Email('no-reply@emaily.com')
        this.subkect = subject;
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)
    }
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email)
        })
    }
}
module.exports = Mailer
//when you use new Mailer; 'new' function calls the contructor within the class first