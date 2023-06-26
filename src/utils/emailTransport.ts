import nodeMailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper

export const transporter = nodeMailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production' ? true : false,
  },
});
