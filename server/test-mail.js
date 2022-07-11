"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'vkdemotest@gmail.com',
          pass: 'Vk123456@',
        },
    });
    transporter.verify().then(console.log).catch(console.error);
    transporter.sendMail({
        from: '"Drop Price Alert" <vkdemotest@gmail.com>', // sender address
        to: "bishukumar007@gmail.com, akashbbu@gmail.com", // list of receivers
        subject: "Email Testing", // Subject line
        html: "<p>Hi, This is a testing email</p>", // html body
      })
      .then(info => {
        console.log({info});
      })
      .catch(console.error);
}

main().catch(console.error);