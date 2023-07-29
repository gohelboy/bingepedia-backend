const route = require('express').Router();
const { add_to_watchlist, remove_from_watchlist, get_from_watchlist } = require('../controller/watchlist.ctrl');
const { isAuthenticated } = require('../middleware/auth');

route.post("/add", isAuthenticated, add_to_watchlist);
route.post("/remove", isAuthenticated, remove_from_watchlist);
route.post("/get", isAuthenticated, get_from_watchlist);

module.exports = route;