const isTest = typeof process.env.AMP_EMAIL_TEST === 'undefined' ? false : !['0', 'false'].includes(process.env.AMP_EMAIL_TEST);
module.exports = {
  isTest,
  url: process.env.URL || isTest ? 'http://localhost:3000' : '',
  mailer: {
    auth: {
      user: process.env.AMP_EMAIL_USER,
      pass: process.env.AMP_EMAIL_PASS,
    },
    host: process.env.AMP_EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.AMP_EMAIL_PORT || 587,
    secure: isTest ? false : typeof process.env.AMP_EMAIL_SECURE === 'undefined' ? true : !!process.env.AMP_EMAIL_SECURE,
  },
  from: process.env.AMP_EMAIL_FROM || 'AuthMailer',
  subject: process.env.AMP_EMAIL_SUBJECT || 'Your Magic Link',
};