const nodemailer = require('nodemailer');

module.exports = function(user, params, zp) {
	// see https://nodemailer.com/about/
	nodemailer.createTestAccount((err, account) => {
	    let transporter = nodemailer.createTransport({
	        host: 'smtp.ethereal.email',
	        port: 587,
	        secure: false,
	        auth: {
	            user: account.user,
	            pass: account.pass,
	        }
	    });

	    const link = 'http://localhost:3000/key/verify/' + encodeURIComponent(zp);

	    let mailOptions = {
	        from: 'AuthMagic',
	        to: user,
	        subject: 'Your Magic Link',
	        text: `Hi friend! Open this link to finish authorization: ${link}`,
	        html: 'Hi friend! Open this link to finish authorization: <a href="${link}">${link}</a>',
	    };

	    transporter.sendMail(mailOptions, (error, info) => {
	        if (error) {
	            return console.log(error);
	        }
	        
	        console.log('Message sent: %s', info.messageId);
	        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	    });
	});

};