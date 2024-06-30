const router = require('express').Router()
const axios = require('axios')
const base_url = 'https://api.themoviedb.org/3'

// trending
router.get('/popular', async (req, res) => {
  try {
    const request = await axios.get(
      `${base_url}/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    )
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
      `${base_url}/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}`
    )
    res.json(request.data.results)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// get actor
router.get('/:ActorId', async (req, res) => {
  try {
    const ActorId = req.params.ActorId
    const request = await axios.get(
      `${base_url}/person/${ActorId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// get images
router.get('/:ActorId/images', async (req, res) => {
  try {
    const ActorId = req.params.ActorId
    const request = await axios.get(
      `${base_url}/person/${ActorId}/images?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// external ids
router.get('/:ActorId/external-ids', async (req, res) => {
  try {
    const ActorId = req.params.ActorId
    const request = await axios.get(
      `${base_url}/person/${ActorId}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
// combined credits
router.get('/:ActorId/credits', async (req, res) => {
  try {
    const ActorId = req.params.ActorId
    const request = await axios.get(
      `${base_url}/person/${ActorId}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    res.json(request.data)
  } catch (err) {
    console.dir(err, { depth: null, color: true })
    res.status(400).json(err)
  }
})
module.exports = router
