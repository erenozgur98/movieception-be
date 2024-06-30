const router = require('express').Router()
const axios = require('axios')
const base_url = 'https://api.themoviedb.org/3'

// trending shows
router.get('/trending', async (req, res) => {
  try {
    const page = req.query.page
    const request = await axios.get(
      `${base_url}/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    )
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// popular
router.get('/popular', async (req, res) => {
  try {
    const request = await axios.get(
      `${base_url}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    )
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// shows
router.get('/', async (req, res) => {
  try {
    const request = await axios.get(`${base_url}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// search
router.get('/:Query/search', async (req, res) => {
  try {
    const query = req.params.Query
    const request = await axios.get(
      `${base_url}/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}`
    )
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// show page request
router.get('/:ShowId/show', async (req, res) => {
  try {
    const ShowId = req.params.ShowId
    const request = await axios.get(`${base_url}/tv/${ShowId}?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// request videos
router.get('/:ShowId/videos', async (req, res) => {
  try {
    const ShowId = req.params.ShowId
    const request = await axios.get(`${base_url}/tv/${ShowId}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// request external Id
router.get('/:ShowId/externalIds', async (req, res) => {
  try {
    const ShowId = req.params.ShowId
    const request = await axios.get(`${base_url}/tv/${ShowId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// request recommendations
router.get('/:ShowId/recommendations', async (req, res) => {
  try {
    const ShowId = req.params.ShowId
    const request = await axios.get(`${base_url}/tv/${ShowId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// request credits
router.get('/:ShowId/credits', async (req, res) => {
  try {
    const ShowId = req.params.ShowId
    const request = await axios.get(
      `${base_url}/tv/${ShowId}/aggregate_credits?api_key=${process.env.REACT_APP_API_KEY}`
    )
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// episodes
router.get('/:ShowId/season/:SeasonId', async (req, res) => {
  try {
    const ShowId = req.params.ShowId
    const SeasonId = req.params.SeasonId
    const request = await axios.get(
      `${base_url}/tv/${ShowId}/season/${SeasonId}?api_key=${process.env.REACT_APP_API_KEY}`
    )
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// watch providers
router.get('/:ShowId/watch-providers', async (req, res) => {
  try {
    const ShowId = req.params.ShowId
    const request = await axios.get(`${base_url}/tv/${ShowId}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// Marvel Shows
router.get('/marvel-shows', async (req, res) => {
  try {
    const request = await axios.get(`${base_url}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=primary_release_date.desc&page=1&with_companies=420%7C19551%7C38679%7C2301%7C13252`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})


module.exports = router
