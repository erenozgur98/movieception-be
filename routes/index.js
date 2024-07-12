const router = require('express').Router()
const apiRoutes = require('./api')
const movieceptionRoutes = require('./movieception')
const { validateAccessToken } = require('../middleware/auth0.middleware')

// Movieception Routes
router.use('/api/v1.0', movieceptionRoutes)

// API Routes
router.use('/api', validateAccessToken, apiRoutes)


module.exports = router
