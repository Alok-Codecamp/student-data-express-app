import nodemailer from 'nodemailer';
import config from '../config';




export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production' ? true : false, // true for port 465, false for other ports
        auth: {
            user: "alok61.bd@gmail.com",
            pass: "lqcj gris xoom kndd",
        },
    });


    // send mail with defined transport object
    await transporter.sendMail({
        from: 'alok61.bd@gmail.com', // sender address
        to: to, // list of receivers
        subject: "Hello from ph-university ✔ ", // Subject line
        text: "Reset your password within 10 minutes!", // plain text body
        html: html, // html body
    });
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

