const nodemailer = require('nodemailer');
const { MAILER_SERVICE, EMAIL, PASSWORD } = require('../../settings');

const createMailerTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: MAILER_SERVICE,
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });
    return transporter;
}

const emailSettings = ({ subject, email, token, url }) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: subject,
        html: `<p>Reset password link: ${url}/${token} </p>`,
        text: `${url}/${token}`
    };
    return mailOptions;
}

const send = (transporter, mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending recovery email: ', error);
        } else {
            console.log('Email sended!');
        }
    });
};

const sendRecoveryEmail = async ({ email, token, url }) => {

    const transport = createMailerTransporter();

    const subject = 'Reset Password Link';

    const mailOptions = emailSettings({ subject, email, token, url });

    try {
        const sended = await send(transport, mailOptions);
        return true;
    } catch (error) {
        console.log('Error sending email: ', error.message);
        return false;
    }
};

module.exports = { sendRecoveryEmail };