const _ = require('lodash');
const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });
const {promisify} = require('util');
const striptags = require('striptags');
const pluginName = 'authmagic-email-plugin';

const sendEmail = async function({pluginConfig, user}) {
  const transporter = nodemailer.createTransport(pluginConfig.mailer);
  const htmlTemplatePath = `./static/${pluginName}/template.html`;
  const nohtmlTemplatePath = `./static/${pluginName}/nohtml-template.html`;
  const mailOptions = {
    text: striptags(nunjucks.render(nohtmlTemplatePath, arguments[0])),
    html: nunjucks.render(htmlTemplatePath, arguments[0]),
    to: user,
    subject: pluginConfig.subject,
    from: pluginConfig.from,
  };
  return promisify(transporter.sendMail).call(transporter, mailOptions);
};

module.exports = function ({user, redirectUrl, params, ekey, config:iconfig}) {
  console.log(ekey);
  const config =  _.omit(iconfig, ['params', 'plugins']);
  const pluginConfig = iconfig ? iconfig.params ? iconfig.params[pluginName] : null : null;
  if (pluginConfig.isTest) {
    nodemailer.createTestAccount((err, auth) => {
      if (!err) {
        sendEmail({ekey, config, pluginConfig: _.merge(pluginConfig, {mailer: {auth}}), user, redirectUrl, params})
          .then((info) => {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          })
          .catch(console.log);
      }
    });
  } else {
    sendEmail({ekey, config, pluginConfig, user, redirectUrl, params}).catch(console.log);
  }
};