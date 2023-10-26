const cron = require('cron');
const https = require('https');

const backendURL = "https://bingepedia-server.onrender.com";

const serverCheckJob = new cron.CronJob('*/14 * * * *', () => {
    console.log("server restarting...");
    https.get(`${backendURL}/ping`, (res) => {
        if (res.statusCode === 200) { console.log("server checked"); }
        else { console.error("Failed to check server status code " + res.statusCode); }
    }).on("error", (err) => {
        console.error("Error during restarting:", err.message);
    })
})

module.exports = { serverCheckJob }