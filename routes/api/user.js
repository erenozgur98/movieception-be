const router = require('express').Router()
const { User, Favorites, History, WatchList, WatchedEpisodes } = require('../../models')

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

router.post('/user-info', async (req, res) => {
  const userData = await User.findOne({ where: { username: req.body.username } })
  if (!userData) {
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      sub: req.body.sub,
      role: req.body.role || 'user'
    })

    const userInfo = {
      role: user.dataValues.role,
      username: user.dataValues.username,
      email: user.dataValues.email,
      createdAt: user.dataValues.createdAt,
      updatedAt: user.dataValues.updatedAt,
      isProfilePublic: user.dataValues.is_profile_public,
      isDarkMode: user.dataValues.is_dark_mode || true
    }

    return res.status(200).json(userInfo)
  } else {
    return res.status()
  }
})

router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
      const favorites = await Favorites.findOne({ where: { username: req.params.username } })
      const history = await History.findOne({ where: { username: req.params.username } })
      const watchList = await WatchList.findOne({ where: { username: req.params.username } })
      const episodes = await WatchedEpisodes.findOne({ where: { username: req.params.username } })

      const userInfo = {
        role: user.dataValues.role,
        username: user.dataValues.username,
        email: user.dataValues.email,
        movieFavorites: favorites?.dataValues?.movieFavorites,
        showFavorites: favorites?.dataValues?.showFavorites,
        movieHistory: history?.dataValues?.movieHistory,
        showHistory: history?.dataValues?.showHistory,
        movieWatchList: watchList?.dataValues?.movieWatchList,
        showWatchList: watchList?.dataValues?.showWatchList,
        episodes: episodes?.dataValues.watchedEpisodes,
        createdAt: user.dataValues.createdAt,
        updatedAt: user.dataValues.updatedAt,
        isProfilePublic: user.dataValues.is_profile_public,
        isDarkMode: user.dataValues.is_dark_mode || true,
      }

      res.status(200).json(userInfo)
    } else {
      res
        .status(403)
        .json({ message: 'Something went wrong getting the user, could mean that you are not logged in/signedup yet ' })
    }
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(403)
  }
})

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
      isProfilePublic: userData?.dataValues.is_profile_public
    }

    res.status(200).json(userInfo)
  } catch (err) {
    console.dir(err, { depth: null, colors: true })
    res.status(500)
  }
})

router.put('/', async (req, res) => {
  return res.status(204).send('nothing to see here')
  // try {
  // const email = await User.findOne({ where: { email: req.body.userData.email } })
  // const user = await User.findOne({ where: { username: req.body.userData.username } })

  // if (user !== null && user?.dataValues?.username !== req.session.username) {
  //   return res.send('That username already exists!')
  // } else if (email !== null && email?.dataValues?.email !== req.session.email) {
  //   return res.send('That email already exists!')
  // } else {
  //   User.update(
  //     {
  //       name: req.body.userData.name || '',
  //       username: req.body.userData.usernameChanged ? req.body.userData.username : req.session.username,
  //       email: req.body.userData.email,
  //       is_dark_mode: req.body.userData.is_dark_mode,
  //       is_profile_public: req.body.userData.is_profile_public,
  //       keep_logged_in_for_30_days: req.body.userData.keep_logged_in_for_30_days,
  //       dob: req.body.userData.dob || '',
  //     },
  //     { where: { username: req.session.username } }
  //   )
  //   if (req.body.userData.usernameChanged) {
  //     Favorites.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
  //     History.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
  //     WatchList.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
  //     WatchedEpisodes.update({ username: req.body.userData.username }, { where: { username: req.session.username } })
  //   }
  // }

  // res.status(200).send('ok')
  // } catch (err) {
  // console.dir(err, { depth: null, colors: true })
  // res.status(400).json(err)
  // }
})

module.exports = router
