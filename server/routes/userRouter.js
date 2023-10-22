const { Router } = require('express');
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const auth = require('../middlewares/auth')


router.get('/refresh', userController.refresh)
router.get('/', userController.getUserProfile)
router.get('/films', userController.getFilmsPage)
router.get('/watchlist', userController.getWatchListPage)
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 64}),
    body('username').isLength({min: 4, max: 64}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/avatar',auth, userController.uploadAvatar)
router.delete('/avatar', auth, userController.deleteAvatar)

module.exports = router