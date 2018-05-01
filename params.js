module.exports = {
  "isTest": true,
  "url": "http://localhost:3000",
  "mailer": {
    "auth": {
      "user": "",
      "pass": ""
    },
    "host": "smtp.ethereal.email",
    "port": 587,
    "secure": false
  },
  "from": "AuthMailer",
  "subject": "Your Magic Link",
  "link": "{{pluginConfig.url}}/check.html?ekey={{ekey | urlencode}}"
};