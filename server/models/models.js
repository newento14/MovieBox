const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {type: DataTypes.STRING, maxLength: 64, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, maxLength: 64},
    avatar: {type: DataTypes.STRING},
})

const Token = sequelize.define('token', {
    refreshToken : {type: DataTypes.STRING, require: true}
})

const WatchList = sequelize.define('watch_list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filmName: {type: DataTypes.STRING},
    filmPicture: {type: DataTypes.STRING},
    filmYear: {type: DataTypes.INTEGER},
})

const FilmsWatched = sequelize.define('films_watched', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rating: {type: DataTypes.DECIMAL, defaultValue: 5},
    favourite: {type: DataTypes.BOOLEAN, defaultValue: false},
    comment: {type: DataTypes.STRING, defaultValue: ""},
    filmName: {type: DataTypes.STRING},
    filmPicture: {type: DataTypes.STRING, defaultValue: ""},
    filmYear: {type: DataTypes.INTEGER},
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasOne(WatchList)
WatchList.belongsTo(User)

User.hasOne(FilmsWatched)
FilmsWatched.belongsTo(User)

module.exports = {
    User,
    Token,
    WatchList,
    FilmsWatched,
}