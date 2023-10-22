const {FilmsWatched} = require('../models/models')
const filmWatchedDto = require('../Dtos/filmWatchedDto')
const ServerError = require("../exceptions/server-error");

class FilmWatchedService {
    async addFilm(body, userId) {
        const film = await FilmsWatched.findOne({where: {filmName: body.filmName, userId: userId}});
        if (film) {
            throw ServerError.BadRequest('films already added');
        }
        const item = await FilmsWatched.create({...body, userId});
        console.log(item);
        return new filmWatchedDto(item.dataValues);
    }

    async getAll(userId) {
        return await FilmsWatched.findAll({
            where: {userId: userId},
            order: [['createdAt', 'DESC']]
        })
    }

    async getFilmsCount(userId){
        return await FilmsWatched.count({ where: { userId } });
    }

    async deleteFilm(id, userId) {
        const item = await FilmsWatched.destroy({where: {id: id}});
        return new filmWatchedDto(item);
    }

    async updateFilm(id, rating, favourite, comment) {
        const item = await FilmsWatched.findOne({where: {id: id}});
        item.rating = rating;
        item.favourite = favourite;
        item.comment = comment;
        await item.save();
        return new filmWatchedDto(item);
    }

    async getProfileStats(userId) {
        const filmCount = await this.getFilmsCount(userId);
        const lastFilms = await FilmsWatched.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: 4,
        });
        return {
            filmCount,
            lastFilms,
        };
    }
}

module.exports = new FilmWatchedService();