const nodemailer = require('nodemailer');
const swig = require('swig');
const striptags = require('striptags');
const {isTest, url, mailer, from, subject} = require('./config');

function sendEmail({mailer, url, z, config, user, params}) {
  const transporter = nodemailer.createTransport(mailer);
  const link = `${url}${config.checkUrl.replace('${z}', encodeURIComponent(z))}`;
  const mailOptions = {
    to: user,
    html: swig.renderFile(__dirname + '/static/template.html', {link, user, params}),
    text: striptags(swig.renderFile(__dirname + '/static/nohtml-template.html', {link, user, params})),
    from,
    subject,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = function ({user, params, z, config}) {
  if (isTest) {
    // see https://nodemailer.com/about/
    nodemailer.createTestAccount((err, auth) => {
      if (!err) {
        sendEmail({mailer: {...mailer, auth}, url, z, config, user, params})
          .then((info) => {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          })
          .catch(console.log);

      }
    });
  } else {
    sendEmail({mailer, url, z, config, user, params}).catch(console.log);
  }
};