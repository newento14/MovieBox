const { Router } = require('express');
const router = new Router()
const auth = require('../middlewares/auth')
const filmWatchedController = require('../controllers/filmWatchedController')
const {body} = require('express-validator')

router.post('/',auth, filmWatchedController.addFilm)
router.get('/', auth, filmWatchedController.getAll)
router.delete('/', auth, filmWatchedController.deleteFilm)
router.put('/', auth, filmWatchedController.updateFilm)

module.exports = router