const nodemailer = require('nodemailer');
const {isTest, url, mailer} = require('./config');

function sendEmail({mailer, url, z, config, user, params}) {
  const transporter = nodemailer.createTransport(mailer);
  const link = `${url}${config.checkUrl.replace('${z}', encodeURIComponent(z))}`;
  const mailOptions = {
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
  })
  ;
}

module.exports = function ({user, params, z, config}) {
  if (isTest) {
    // see https://nodemailer.com/about/
    nodemailer.createTestAccount((err, auth) => {
      if (!err) {
        sendEmail({mailer: {...mailer, auth}, url, z, config, user, params});
      }
    });
  } else {
    sendEmail({mailer, url, z, config, user, params});
  }
};