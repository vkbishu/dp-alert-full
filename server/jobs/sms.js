const { parentPort } = require('worker_threads');
const {QueueTask} = require('../models');
const { Op } = require("sequelize");


// store boolean if the job is cancelled
let isCancelled = false;

// handle cancellation
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

(async () => {
    const tasks = await QueueTask.findAll({
        where: {
            job: 'sms',
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

            // send SMS
            console.log('Sending SMS to:', task.data.to);
            //delete task
            await task.destroy();
        })
    );
    done();
})();
