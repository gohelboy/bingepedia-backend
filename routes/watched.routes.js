const route = require('express').Router();
const { add_to_watched, remove_from_watched, get_from_watched } = require('../controller/watched.ctrl');
const { isAuthenticated } = require('../middleware/auth');

route.post("/add", isAuthenticated, add_to_watched);
route.post("/remove", isAuthenticated, remove_from_watched);
route.post("/get", get_from_watched);

module.exports = route;