const router = require('express').Router()
const userRoutes = require('./user')
const historyRoute = require('./historyRoute')
const favoriteRoutes = require('./favoritesRoute')
const watchListRoute = require('./watchListRoute')
const watchedEpisodesRoute = require('./watchedEpisodesRoute')

router.use('/users', userRoutes)
router.use('/history', historyRoute)
router.use('/favorites', favoriteRoutes)
router.use('/watchlist', watchListRoute)
router.use('/watchedepisodes', watchedEpisodesRoute)

module.exports = router
