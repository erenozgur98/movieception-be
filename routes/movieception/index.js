const router = require('express').Router()
const movieRoutes = require('./movieRoutes')
const showRoutes = require('./showRoutes')
const actorRoutes = require('./actorRoutes')

router.use('/movies', movieRoutes)
router.use('/shows', showRoutes)
router.use('/actors', actorRoutes)

module.exports = router