const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    data: { type: Array }
})
const wathchlistModel = mongoose.model('wathchlist', watchlistSchema);
module.exports = wathchlistModel;