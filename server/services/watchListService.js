const {WatchList} = require('../models/models')
const watchListDto = require('../Dtos/watchListDto')
const {where} = require("sequelize");

class WatchListService {
    async addFilm(filmName, filmPicture, filmYear, userId) {
        const item = await WatchList.create({filmName, filmPicture, filmYear, userId});
        return new watchListDto(item);
    }

    async getAll(userId) {
        const items =  await WatchList.findAll({
            where: {userId: userId},
            order: [['createdAt', 'DESC']]
        });
        return items.map(x => new watchListDto(x));
    }

    async deleteFilm(filmId, userId) {
        const item = await WatchList.destroy({where: {id: filmId, userId: userId}});
        return new watchListDto(item);
    }
}

module.exports = new WatchListService();