const router = require('express').Router()
const apiRoutes = require('./api')
const movieceptionRoutes = require('./movieception')
const { validateAccessToken } = require('../middleware/auth0.middleware')

// API Routes
router.use('/api', validateAccessToken, apiRoutes)

// Movieception Routes
router.use('/api/v1.0', movieceptionRoutes)

module.exports = router
