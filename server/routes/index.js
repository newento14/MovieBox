const { Router } = require('express');
const router = Router(); // Створюємо об'єкт Router
const userRouter = require('./userRouter');
const watchListRouter = require('./watchListRouter');
const filmWatchedRouter = require('./filmWatchedRouter')

router.use('/user', userRouter);
router.use('/watchList', watchListRouter);
router.use('/films', filmWatchedRouter);

module.exports = router;