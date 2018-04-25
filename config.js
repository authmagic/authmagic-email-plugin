const isTest = typeof process.env.MAIL_TEST === 'undefined' ? false : !!process.env.MAIL_TEST;
module.exports = {
  isTest,
  url: process.env.URL || isTest ? 'http://localhost:3000' : '',
  mailer: {
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    host: process.env.MAIL_HOST || 'smtp.ethereal.email',
    port: process.env.MAIL_PORT || 587,
    secure: isTest ? false : typeof process.env.MAIL_SECURE === 'undefined' ? true : !!process.env.MAIL_SECURE,
  },
};