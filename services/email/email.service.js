const EmailTemplates = require('email-templates');
const nodeMailer = require('nodemailer');
const path = require('path');

const {ROOT_EMAIL, ROOT_EMAIL_PASSWORD, ROOT_EMAIL_SERVICE, FRONTEND_URL} = require('../../config');
const htmlTemplates = require('../../email-templates');

const transporter = nodeMailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
})

class emailService {
    async sendMail(userMail, action, context) {
        try {
        const templateInfo = htmlTemplates[action];
        const html = await emailTemplates.render(
            templateInfo.templateFileName,
            {...context, frontendUrl: FRONTEND_URL}
            );

        const mailOptions = {
            from: 'no reply shop',
            to: userMail,
            subject: templateInfo.subject,
            html
        }

        return transporter.sendMail(mailOptions);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new emailService();
