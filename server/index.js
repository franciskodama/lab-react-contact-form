const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post('/send_mail', cors(), async (req, res) => {
  let { text } = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.REACT_APP_MAIL_HOST,
    port: process.env.REACT_APP_MAIL_PORT,
    auth: {
      user: process.env.REACT_APP_MAIL_USER,
      pass: process.env.REACT_APP_MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.REACT_APP_MAIL_FROM,
    to: 'fk.ca@fkodama.com',
    subject: 'test email',
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your email!</h2>
        <p>${text}</p>
    
        <p>All the best, Darwin</p>
         </div>
    `,
  });
});

app.listen(
  (process.env.REACT_APP_MAIL_PORT || 3000,
  () => {
    console.log(
      `Server is listening on port ${process.env.REACT_APP_MAIL_PORT}`
    );
    console.log(process.env.REACT_APP_MAIL_HOST);
    console.log(process.env.REACT_APP_MAIL_PORT);
    console.log(process.env.REACT_APP_MAIL_USER);
    console.log(process.env.REACT_APP_MAIL_PASS);
    console.log(process.env.REACT_APP_MAIL_FROM);
  })
);
