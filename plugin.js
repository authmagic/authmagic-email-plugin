const nodemailer = require('nodemailer');
const {isTest, host, port, secure, user, pass, url} = require('./config');

function sendEmail({host, port, secure, user, pass, url, z, checkUrl}) {
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {user, pass},
    });

    const link = `${url}${checkUrl.replace('${z}', encodeURIComponent(z))}`;

    let mailOptions = {
        from: 'AuthMagic',
        to: user,
        subject: 'Your Magic Link',
        text: `Hi friend! Open this link to finish authorization: ${link}`,
        html: `Hi friend! Open this link to finish authorization: <a href="${link}">${link}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = async function({user, params, z, config: {checkUrl}}) {
	if(isTest) {
        // see https://nodemailer.com/about/
        nodemailer.createTestAccount((err, {user, pass}) => {
            if(!err) {
                sendEmail({host, port, secure, user, pass, url, z, checkUrl});
            }
        });
	}



};