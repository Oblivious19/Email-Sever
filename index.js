import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/index.html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
   });

app.post('/send-email', async (req, res) => {
  try {
    let { to, cc, bcc, subject, text, html, attachments } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shreya.ojha1921@gmail.com', 
        pass: 'kdpp kkrz qczv lfzm' // I generated an application-specific password for my gmail
      }
    });

    
    let  mailOptions = {
      from: 'shreya.ojha1921@gmail.com',
      to, 
      cc, 
      bcc, 
      subject, 
      text, 
      html, 
      attachments 
    };

 
    await transporter.sendMail(mailOptions);

    // Response 
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});