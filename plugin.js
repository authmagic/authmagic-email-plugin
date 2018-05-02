const _ = require('lodash');
const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });
const {promisify} = require('util');
const striptags = require('striptags');

const sendEmail = async function({ekey, config, pluginConfig, user, params}) {
  const transporter = nodemailer.createTransport(pluginConfig.mailer);
  const htmlTemplatePath = './static/authmagic-email/template.html';
  const nohtmlTemplatePath = './static/authmagic-email/nohtml-template.html';
  const mailOptions = {
    text: striptags(nunjucks.render(nohtmlTemplatePath, arguments[0])),
    html: nunjucks.render(htmlTemplatePath, arguments[0]),
    to: user,
    subject: pluginConfig.subject,
    from: pluginConfig.from,
  };
  return promisify(transporter.sendMail).call(transporter, mailOptions);
};

module.exports = function ({user, params, ekey, config:iconfig}) {
  const config = Object.assign({}, iconfig, {params: undefined, plugins: undefined});
  const pluginConfig = iconfig ? iconfig.params ? iconfig.params['authmagic-email-plugin'] : null : null;
  if (pluginConfig.isTest) {
    // see https://nodemailer.com/about/
    nodemailer.createTestAccount((err, auth) => {
      if (!err) {
        sendEmail({ekey, config, pluginConfig: _.merge(pluginConfig, {mailer: {auth}}), user, params})
          .then((info) => {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          })
          .catch(console.log);
      }
    });
  } else {
    sendEmail({ekey, config, pluginConfig, user, params}).catch(console.log);
  }
};