const userService = require('../services/userService')
const {validationResult} = require('express-validator')
const serverError = require('../exceptions/server-error')
const uuid = require('uuid')
const {User} = require("../models/models")

class UserController {
    async registration(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(serverError.BadRequest('Validation error', errors.array()))
            }
            const {username,email, password} = req.body;
            console.log(req.body);
            const data = await userService.registration(username,email,password);
            console.log(data);
            res.cookie('refreshToken', data.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const data = await userService.login(email,password);
            res.cookie('refreshToken', data.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken);
            const data = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getUserProfile(req, res, next) {
        try {
            const {userName} = req.query;
            const data = await userService.getUserProfile(userName);
            console.log(data);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getFilmsPage(req, res, next) {
        try {
            const {userName} = req.query;
            const data = await userService.getFilmsPage(userName);
            console.log(data);
            return res.json(data);

        } catch (e) {
            next(e);
        }
    }

    async getWatchListPage(req, res, next) {
        try {
            const {userName} = req.query;
            const data = await userService.getWatchListPage(userName)
            console.log(data);
            return res.json(data);

        } catch (e) {
            next(e);
        }
    }

    async uploadAvatar(req, res, next) {
        try {
            const file = req.files.file;
            const user = await User.findOne({where: {id: req.user.id}});
            const name = uuid.v4() + '.jpg';
            file.mv(process.env.STATIC_PATH + '\\' + name);
            user.avatar = name;
            await user.save();
            return res.json({message: "success"});

        } catch (e) {
            next(e);
        }
    }

    async deleteAvatar(req, res, next) {
        try {
            const user = await User.findOne({where: {id: req.user.id}});
            if (user.avatar !== "") {
                fs.unlinkSync(process.env.STATIC_PATH + '\\' + user.avatar);
                user.avatar = "";
            }
            return res.status(200);

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();