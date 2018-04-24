const isTest = typeof process.env.MAIL_TEST === 'undefined' ? false : !!process.env.MAIL_TEST;
module.exports = {
	isTest,
	host: process.env.MAIL_HOST || 'smtp.ethereal.email',
	port: process.env.MAIL_PORT || 587,
	secure: isTest ? false : typeof process.env.MAIL_SECURE === 'undefined' ? true : !!process.env.MAIL_SECURE,
	user: process.env.MAIL_USER,
	pass: process.env.MAIL_PASS,
	url: process.env.URL || isTest ? 'http://localhost:3000' : '',
};