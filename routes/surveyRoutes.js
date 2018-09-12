const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Survey = mongoose.model('surveys')


module.exports = app => {
    //req will contain a title, body, recipients 
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for responding')
    })

    app.post('/api/surveys/webhooks', (req, res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice')

    const events =_.chain(req.body)
        .map(({email, url})=>{
            const match = p.test(new URL(url).pathname)
            console.log('match', match)
            if(match){
                return {email, surveyId: match.surveyId, choice: match.choice}
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .value()
    console.log('unique', events)
    res.send({})
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body
        //survey is an instance of Survey that is going to be saved
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })
        const mailer = new Mailer(survey, surveyTemplate(survey))
        try {
            await mailer.send()
            await survey.save()
            req.user.credits -= 1;
            const user = await req.user.save()
            res.send(user)
        }
        catch (err) {
            res.status(422).send(err)
        }

    })
}

