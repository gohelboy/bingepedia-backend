require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const path = require('path');
const mongo_connect = require('./services/db_connect');
const { serverCheckJob } = require('./cron/cron');
const { notFoundResponse } = require('./utils/response');
const indexRouter = require('./routes/index.routes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
morgan.format('myformat', '[:date[clf]] :method :url HTTP/:http-version Status: :status CL: :res[content-length] - :response-time ms');
app.use(morgan('myformat'))
app.use('/public', express.static(path.join(__dirname, "public")));
app.use('/public/profile-picture', express.static(path.join(__dirname, "public/profile-picture")));

serverCheckJob.start();

app.get("/ping", (req, res) => {
    console.log("Ping response", res.statusCode);
    return;
})

app.use('/api', indexRouter);

app.all("*", (req, res) => {
    console.log("unkown route !!!");
    return notFoundResponse(res, "Api end point does not exists!");
})

app.listen(PORT, (req, res) => {
    mongo_connect();
    console.log('Server listening on port ' + PORT)
})