// Models/mailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omaimaelbdraouy@gmail.com',
    pass: 'rhem drbk tcmn aoup'
  }
});

const sendEmailToUsers = async (emails, subject, message) => {
  for (const email of emails) {
    await transporter.sendMail({
      from: 'omaimaelbdraouy@gmail.com',
      to: email,
      subject,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color:rgb(45, 31, 243);
              text-align: center;
            }
            p {
              font-size: 16px;
              line-height: 1.6;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color:rgb(7, 31, 218);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
               <h1>Tawjih 360</h1>
            <h3>${subject}</h3>
            <p>Bonjour,</p>
            <p>Un nouvel événement a été ajouté :</p>
            <ul>
              <li><strong>Nom</strong>: ${message.nom}</li>
            <li><strong>Lieu</strong>: ${message.lieu}</li>
          <li><strong>Date</strong>: ${message.date}</li>
            <li><strong>Description</strong>: ${message.description}</li>
            </ul>
            <a href="http://localhost:5173/Login" class="button">Voir plus</a>
            <div class="footer">
              <p>Merci pour votre attention!</p>
              <p>&copy; 2025 Ton entreprise</p>
            </div>
          </div>
        </body>
      </html>`
 
    });
  }
};

// ⬇️ Exportation par défaut
export default sendEmailToUsers;
