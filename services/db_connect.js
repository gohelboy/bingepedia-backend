const mongoose = require('mongoose');

const connect_mongo = () => {
    try {
        mongoose.connect(process.env.MONGODB_STRING)
        .then(()=>console.log('Connected to Mongo server'))
        .catch((error)=> {console.log(error)});
    } catch (error) {
        console.log(error);
    }
}
module.exports = connect_mongo;