const nodemailer = require('nodemailer');
const swig = require('swig');
const fs = require('fs');
const {promisify} = require('util');
const striptags = require('striptags');
const {isTest, url, mailer, from, subject} = require('./config');

const existsAsync = promisify(fs.exists);
const sendEmail = async function({mailer, url, z, config, user, params}) {
  const transporter = nodemailer.createTransport(mailer);
  const link = `${url}${config.checkUrl.replace('${z}', encodeURIComponent(z))}`;
  const htmlTemplatePath = (await existsAsync('./static_custom/authmagic-email/template.html')) ?
    './static_custom/authmagic-email/template.html' : __dirname + '/static/template.html';
  const nohtmlTemplatePath = (await existsAsync('./static_custom/authmagic-email/nohtml-template.html')) ?
    './static_custom/authmagic-email/nohtml-template.html' : __dirname + '/static/nohtml-template.html';
  const mailOptions = {
    text: striptags(swig.renderFile(nohtmlTemplatePath, {link, user, params})),
    html: swig.renderFile(htmlTemplatePath, {link, user, params}),
    to: user,
    subject,
    from,
  };
  return promisify(transporter.sendMail).call(transporter, mailOptions);
};

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