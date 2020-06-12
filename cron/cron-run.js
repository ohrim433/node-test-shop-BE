const cron = require('node-cron');

const {CRON_JOB_INTERVAL} = require('../config');
const nullProductPhotoSender = require('./null-product-photo-sender');

module.exports = () => {
    cron.schedule(CRON_JOB_INTERVAL, async () => {
        console.log(`CRONE JOB STARTED AT ${new Date().toISOString()}`)

        try {
            await nullProductPhotoSender();
        } catch (e) {
            console.log(
                `CRONE JOB FINISHED AT ${new Date().toISOString()} 
                \n ${JSON.stringify(e, null, 2)}`
            );
        }

        console.log(`CRONE JOB FINISHED AT ${new Date().toISOString()}`);
    })
}
