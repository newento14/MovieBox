const {FilmsWatched} = require('../models/models')
const filmWatchedDto = require('../Dtos/filmWatchedDto')
const {where} = require("sequelize");

class WatchListService {
    async addFilm(rating, filmName, filmPicture, filmYear, userId) {
        const item = await FilmsWatched.create({rating, filmName, filmPicture, filmYear, userId});
        console.log(item);
        return new filmWatchedDto(item.dataValues);
    }

    async getAll(userId) {
        const items =  await FilmsWatched.findAll({where: {userId: userId} });
        return items.map(x => new filmWatchedDto(x.dataValues));
    }

    async deleteFilm(id, userId) {
        const item = await FilmsWatched.destroy({where: {id: id}});
        return new filmWatchedDto(item);
    }

    async updateFilm(id, rating) {
        const item = await FilmsWatched.findOne({where: {id: id}});
        item.rating = rating;
        await item.save();
        return new filmWatchedDto(item);
    }
}

module.exports = new WatchListService();