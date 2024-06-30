const router = require('express').Router()
const axios = require('axios')
const base_url = 'https://api.themoviedb.org/3'

// trending all
router.get('/trending-all', async (req, res) => {
  try {
    const page = req.query.page
    const request = await axios.get(`${base_url}/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// trending movies
router.get('/trending', async (req, res) => {
  try {
    const page = req.query.page
    const request = await axios.get(`${base_url}/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// netflix original movies
router.get('/netflix-originals', async (req, res) => {
  try {
    const page = req.query.page
    const request = await axios.get(`${base_url}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213&page=${page}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// popular movies
router.get('/popular', async (req, res) => {
  try {
    let page = req.query.page
    const request = await axios.get(`${base_url}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// topRated movies
router.get('/top-rated', async (req, res) => {
  try {
    const request = await axios.get(`${base_url}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// now playing
router.get('/now-playing', async (req, res) => {
  try {
    const request = await axios.get(`${base_url}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// search multi
router.get('/:Query/search-multi', async (req, res) => {
  try {
    const query = req.params.Query
    const request = await axios.get(`${base_url}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// search movie
router.get('/:Query/search', async (req, res) => {
  try {
    const query = req.params.Query
    const request = await axios.get(`${base_url}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// search collection
router.get('/:Query/search-collection', async (req, res) => {
  try {
    // default to current year
    const currentYear = new Date().getFullYear()
    let query = currentYear
    if (req.params.Query) {
      query = req.params.Query
    }
    const request = await axios.get(`${base_url}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&primary_release_year=${query}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// search discover by year
router.get('/:Query/discover-by-release-year', async (req, res) => {
  try {
    const query = req.params.Query
    const request = await axios.get(`${base_url}/search/collection?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}`)
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// movie page request
router.get('/:MovieId/movie', async (req, res) => {
  try {
    const MovieId = req.params.MovieId
    const request = await axios.get(`${base_url}/movie/${MovieId}?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// request videos
router.get('/:MovieId/videos', async (req, res) => {
  try {
    const MovieId = req.params.MovieId
    const request = await axios.get(`${base_url}/movie/${MovieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// request external Id
router.get('/:MovieId/externalIds', async (req, res) => {
  try {
    const MovieId = req.params.MovieId
    const request = await axios.get(`${base_url}/movie/${MovieId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// request recommendations
router.get('/:MovieId/recommendations', async (req, res) => {
  try {
    const MovieId = req.params.MovieId
    const request = await axios.get(`${base_url}/movie/${MovieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// request credits
router.get('/:MovieId/credits', async (req, res) => {
  try {
    const MovieId = req.params.MovieId
    const request = await axios.get(`${base_url}/movie/${MovieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// collections
router.get('/:CollectionId/collections', async (req, res) => {
  try {
    const CollectionId = req.params.CollectionId
    const request = await axios.get(`${base_url}/collection/${CollectionId}?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// upcoming
router.get('/upcoming', async (req, res) => {
  try {
    const request = await axios.get(`${base_url}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&region=US&with_release_type=2|3`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})
// watch providers
router.get('/:MovieId/watch-providers', async (req, res) => {
  try {
    const MovieId = req.params.MovieId
    const request = await axios.get(`${base_url}/movie/${MovieId}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})

// Marvel Movies
router.get('/marvel-movies', async (req, res) => {
  try {
    const page = req.query.page
    const request = await axios.get(`${base_url}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=primary_release_date.desc&page=${page}&with_companies=420%7C19551%7C38679%7C2301%7C13252`)
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})

module.exports = router