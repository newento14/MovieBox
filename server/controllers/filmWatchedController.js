const serverError = require('../exceptions/server-error')
const filmWatchedService = require('../services/filmWatchedService')

class FilmWatchedController {
    async addFilm(req, res, next) {
        try {
            console.log(req.body);
            const userId = req.user.id;
            const data = await filmWatchedService.addFilm(req.body, userId);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async deleteFilm(req, res, next) {
        try {
            const {id} = req.query;
            const userId = req.user.id;
            const data = await filmWatchedService.deleteFilm(id, userId);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.user.id;
            const data = await filmWatchedService.getAll(userId);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async updateFilm(req, res, next) {
        try {
            const {id, rating, favourite, comment} = req.body;
            const data = await filmWatchedService.updateFilm(id, rating, favourite, comment);
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FilmWatchedController();