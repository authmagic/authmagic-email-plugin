authmagic-email-plugin
========================
Plugin for <a href="https://github.com/authmagic/authmagic">authmagic</a> to send authorization links on email. It works with <a href="https://github.com/authmagic/authmagic-timerange-stateless-core">authmagic-timerange-stateless-core</a>.

Params:
-----------
isTest - boolean flag that shows if plugin is executing in the test mode. If so then email will not be sent, but you could see the email in the console

mailer - object for configuring nodemailer

from - name of the sender

subject - subject of the email

Installation
-----------
Check <a href="https://github.com/authmagic/authmagic-cli">authmagic-cli</a>.
```
authmagic install authmagic-email-plugin
```

How to edit template
----------
In your folder with authentication service find static/authmagic-email-plugin folder. There you will see 2 files: template.html and nohtml-template.html. <a href="https://mozilla.github.io/nunjucks/">nunjucks</a> is used as templating engine.

Magic link
-----------
To check the identity of the user it is possible to send to his email, phone or any other resource he owns an authorization link. By clicking on that link user identifies himself as an owner of the resource. You can see many apps who suggest this option, for example <a href="https://medium.com/">medium.com</a> and <a href="https://auth0.com/">auth0.com</a>.
<img src="https://github.com/authmagic/authmagic/blob/master/docs/images/authmagic-timerange-stateless-core.png?raw=true" width="600px"/>

How it looks in the real world:

<img src="https://github.com/authmagic/authmagic/blob/master/docs/images/medium-example1.png?raw=true" width="600px"/>
<img src="https://github.com/authmagic/authmagic/blob/master/docs/images/medium-confirm.png?raw=true" width="600px"/>
