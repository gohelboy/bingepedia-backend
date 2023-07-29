const mongoose = require('mongoose');

const watchedSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    data: {type: Array}
})
const watchedModel = mongoose.model('watched', watchedSchema);
module.exports = watchedModel;