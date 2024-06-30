const path = require('path')
const router = require('express').Router()
const apiRoutes = require('./api')
const movieceptionRoutes = require('./movieception')

// API Routes
router.use('/api', apiRoutes)

// Movieception Routes
router.use('/api/v1.0', movieceptionRoutes)

module.exports = router
