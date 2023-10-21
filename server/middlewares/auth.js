const serverError = require('../exceptions/server-error');
const tokenService = require('../services/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(serverError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(serverError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(serverError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(serverError.UnauthorizedError());
    }
};