// import cors from 'cors';
const cors = require('cors');
// import { createTransport } from 'nodemailer';
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.set('Access-Control-Allow-Origin', '*');
app.use('/', router);
app.listen(process.env.REACT_APP_PORT, () =>
  console.log(`Server listening on ${process.env.REACT_APP_PORT}`)
);

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_GMAIL_USER,
    pass: process.env.REACT_APP_GMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready do Send');
  }
});

router.post('/contact', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: name,
    to: process.env.REACT_APP_GMAIL_USER,
    subject: 'Contact Form Submission',
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: 'ERROR' });
    } else {
      res.json({ status: 'Message Sent' });
    }
  });
});
