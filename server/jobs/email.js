const { parentPort } = require('worker_threads');
const {QueueTask} = require('../models');
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

// store boolean if the job is cancelled
let isCancelled = false;

// handle cancellation (this is a very simple example)
if (parentPort){
    parentPort.once('message', message => {
        if (message === 'cancel') isCancelled = true;
    });
}

function done(){
    // signal to parent that the job is done
    if (parentPort) parentPort.postMessage('done');
    else process.exit(0);
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'vkdemotest@gmail.com',
      pass: 'Vk123456@',
    },
});

(async () => {
    // fetch only that much records that can be processed within the given interval of time in bree
    // for example: if 5 emails can be sent in 2 minutes, then fetch only 5 records at a time
    const tasks = await QueueTask.findAll({
        where: {
            job: 'email',
            schedule_at: {
                [Op.lte]: new Date()
            }
        }
    });
    if(tasks.length === 0){
        done();
    }
    await Promise.all(
        tasks.map(async task => {
            // if we've already cancelled this job then return early
            if (isCancelled) return;

            // send email
            console.log('Sending Email to:', task.data.to);
            try{
                await transporter.sendMail({
                    from: '"Drop Price Alert" <vkdemotest@gmail.com>', // sender address
                    to: task.data.to,
                    subject: task.data.subject,
                    html: task.data.message, 
                });
                // remove task
                await task.destroy();
                console.log('Email Sent...');
            }catch(err){
                console.error(err);
            }
        })
    );
    done();
})();
