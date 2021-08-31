import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGIRD_PASSWORD,
  },
});

export const sendForgotEmail = async (email: string, token: string): Promise<void> => {
  const mailOptions = {
    to: email,
    from: 'daniladanila2378@gmail.com',
    subject: 'Forgot password',
    html: `Forgot password <a href="http://localhost:3000/change-password/${token}">link</a>`,
  };

  try {
    await smtpTransport.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
};
