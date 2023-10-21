const { Router } = require('express');
const router = new Router()
const auth = require('../middlewares/auth')
const watchListController = require('../controllers/watchListController')
const {body} = require('express-validator')

router.post('/',auth, watchListController.addFilm)
router.get('/', auth, watchListController.getAll)
router.delete('/', auth, watchListController.deleteFilm)

module.exports = router