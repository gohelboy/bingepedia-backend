const userRoute = require('./user.routes')
const watchlistRoute = require('./watchlist.routes')
const watchedRoute = require('./watched.routes')

const route = require('express').Router();

route.use('/user', userRoute)
route.use('/watchlist', watchlistRoute)
route.use('/watched', watchedRoute)

module.exports = route;