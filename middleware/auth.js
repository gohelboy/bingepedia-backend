const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const { unauthorizedResponse } = require('../utils/response');

exports.isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization && !req.headers.authorization?.split(" ")[0]) return unauthorizedResponse(res, "token is required!")
    const token = req.headers.authorization.split(" ")[0];
    jwt.verify(token, 'jwt-secret', (err, decoded) => {
        if (err) return unauthorizedResponse(res, "your token expired", err);
        userModel.findById(decoded.id).then(() => {
            req.userId = decoded.id;
            next();
        }).catch((err) => {
            return unauthorizedResponse(res, "your token malformed", err);
        });
    });
}