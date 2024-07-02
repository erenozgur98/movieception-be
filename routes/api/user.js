const router = require('express').Router()
const { User, Favorites, History, WatchList, WatchedEpisodes } = require('../../models')
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    users.forEach((user) => {
      delete user.dataValues.password
      delete user._previousDataValues.password
    })

    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.get('/login', async (req, res) => {
  try {
    if (req.session.user_id) {
      res.send({ logged_in: true, user_id: req.session.user_id })
    } else {
      res.send({ logged_in: false })
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/user', async (req, res) => {
  try {
    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id)
      delete userData.dataValues.password

      const favorites = await Favorites.findOne({ where: { username: req.session.username } })
      const history = await History.findOne({ where: { username: req.session.username } })
      const watchList = await WatchList.findOne({ where: { username: req.session.username } })
      const episodes = await WatchedEpisodes.findOne({ where: { username: req.session.username } })

      watchList?.dataValues.showWatchList?.map((s) => (s.id = +s.id))
      watchList?.dataValues.movieWatchList?.map((m) => (m.id = +m.id))

      const userInfo = {
        role: userData.dataValues.role,
        username: userData.dataValues.username,
        email: userData.dataValues.email,
        logged_in: true,
        movieFavorites: favorites?.dataValues?.movieFavorites,
        showFavorites: favorites?.dataValues?.showFavorites,
        movieHistory: history?.dataValues?.movieHistory,
        showHistory: history?.dataValues?.showHistory,
        movieWatchList: watchList?.dataValues?.movieWatchList,
        showWatchList: watchList?.dataValues?.showWatchList,
        episodes: episodes?.dataValues.watchedEpisodes,
        createdAt: userData.dataValues.createdAt,
        updatedAt: userData.dataValues.updatedAt,
        name: userData.dataValues.name || '',
        dob: userData.dataValues.dob || '',
        isProfilePublic: userData.dataValues.is_profile_public,
        keepLoggedInFor30Days: userData.dataValues.keep_logged_in_for_30_days || false,
        isDarkMode: userData.dataValues.is_dark_mode || true,
        // TODO:
        // facebook: ,
        // instagram: ,
        // twitter: ,
        // linkedin: ,
        // github: ,
      }

      // re-settings session values incase if there's an update on those values;
      req.session.username = userData.dataValues.username
      req.session.email = userData.dataValues.email

      res.json(userInfo)
    } else {
      res
        .status(403)
        .json({ message: 'Something went wrong getting the user, could mean that you are not logged in/signedup yet ' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/signup', async (req, res) => {
  try {
    if (!req.body.role) req.body.role = 'user'

    const email = await User.findOne({ where: { email: req.body.email } })
    const user = await User.findOne({ where: { username: req.body.username } })
    if (user) {
      res.status(400).json({ message: 'That username is taken' })
    } else if (email) {
      res.status(400).json({ message: 'That email is taken' })
    } else {
      const newUser = await User.create(req.body)
      delete newUser.password

      req.session.user_id = newUser.id
      req.session.logged_in = true
      req.session.username = newUser.username

      res.json(newUser)
    }
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(404).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } })

    if (!user) {
      res.status(403).json({ msg: 'Incorrect Username' })
      return
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return
    }

    delete user.password

    req.session.user_id = user.id
    req.session.logged_in = true
    req.session.username = user.username
    req.session.email = user.email

    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})

// GET one user
router.get('/:username', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.params.username } })
    delete userData?.dataValues.password
    if (!userData || userData === null) {
      res.status(404).json({ message: 'No user with this username!' })
      return
    }

    const favorites = await Favorites.findOne({ where: { username: req.params.username } })
    const history = await History.findOne({ where: { username: req.params.username } })
    const watchList = await WatchList.findOne({ where: { username: req.params.username } })
    const episodes = await WatchedEpisodes.findOne({ where: { username: req.params.username } })

    // will be adding avatar and banner in da future;
    const userInfo = {
      role: userData?.dataValues.role,
      username: userData?.dataValues.username,
      movieFavorites: favorites?.dataValues?.movieFavorites,
      showFavorites: favorites?.dataValues?.showFavorites,
      movieHistory: history?.dataValues?.movieHistory,
      showHistory: history?.dataValues?.showHistory,
      movieWatchList: watchList?.dataValues?.movieWatchList,
      showWatchList: watchList?.dataValues?.showWatchList,
      episodes: episodes?.dataValues.watchedEpisodes,
      createdAt: userData?.dataValues.createdAt,
      name: userData?.dataValues.name || '',
      isProfilePublic: userData?.dataValues.is_profile_public,
      dob: userData?.dataValues.dob,
    }

    res.status(200).json(userInfo)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(500)
  }
})

router.put('/', async (req, res) => {
  try {
    const email = await User.findOne({ where: { email: req.body.userData.email } })
    const user = await User.findOne({ where: { username: req.body.userData.username } })

    if (user !== null && user?.dataValues?.username !== req.session.username) {
      return res.send('That username already exists!')
    } else if (email !== null && email?.dataValues?.email !== req.session.email) {
      return res.send('That email already exists!')
    } else {
      User.update(
        {
          name: req.body.userData.name || '',
          username: req.body.userData.usernameChanged ? req.body.userData.username : req.session.username,
          email: req.body.userData.email,
          is_dark_mode: req.body.userData.is_dark_mode,
          is_profile_public: req.body.userData.is_profile_public,
          keep_logged_in_for_30_days: req.body.userData.keep_logged_in_for_30_days,
          dob: req.body.userData.dob || '',
        },
        { where: { username: req.session.username } }
      )
      if (req.body.userData.usernameChanged) {
        Favorites.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
        History.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
        WatchList.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
        WatchedEpisodes.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
      }
    }

    res.status(200).send('ok')
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})

router.put('/change-password', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.session.username } })

    if (!user || user === null) return res.status(401)

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)

    if (!validPassword) {
      return res.status(404)
    }

    const newPw = await bcrypt.hash(req.body.newPassword, 10)

    User.update({ password: newPw }, { where: { username: req.session.username } })

    res.status(200).send('ok')
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(400).json(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

router.delete('/username', (req, res) => {
  // to be written
})

module.exports = router
