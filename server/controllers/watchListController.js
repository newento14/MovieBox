const serverError = require('../exceptions/server-error')
const watchListService = require('../services/watchListService')

class WatchListController {
    async addFilm(req, res, next) {
        try {
            const {filmName, filmPicture, filmYear } = req.body;
            const userId = req.user.id;
            const data = await watchListService.addFilm(filmName, filmPicture, filmYear, userId);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async deleteFilm(req, res, next) {
        try {
            const {id} = req.query;
            const userId = req.user.id;
            console.log(id, )
            const data = await watchListService.deleteFilm(id, userId);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.user.id;
            const data = await watchListService.getAll(userId);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new WatchListController();