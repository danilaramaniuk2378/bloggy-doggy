import config from '../config';
import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: config.SENDGIRD_USER,
    pass: config.SENDGIRD_PASSWORD,
  },
});

export const sendForgotEmail = async (email, host, token) => {
  const mailOptions = {
    to: email,
    from: 'rentflat@rentflat.com',
    subject: 'Восстановление пароля',
    text: `Привет, дружок, я выслал тебе письмо! http://${host}/forgot-password/${token}`,
  };

  await smtpTransport.sendMail(mailOptions);
};
